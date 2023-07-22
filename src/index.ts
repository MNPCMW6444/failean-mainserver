import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./app/routers/auth/authRouter";
import accountsRouter from "./app/routers/accounts/accountsRouter";
import websiteRouter from "./app/routers/website/websiteRouter";
import dataRouter from "./app/routers/data/dataRouter";
import gqlRouter from "./app/routers/gqlRouter";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./app/typeDefs";
import { RedisPubSub } from "graphql-redis-subscriptions";
import Query from "./app/resolvers/query";
import Mutation from "./app/resolvers/mutation";
import Subscription from "./app/resolvers/subscription";
import { ApolloServerPluginLandingPageDisabled } from "apollo-server-core";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Server } from "ws";
import axios from "axios";
import { safeStringify } from "./app/util/jsonUtil";
import { v4 as uuidv4 } from "uuid";
import expressBasicAuth from "express-basic-auth";
import { serverAdapter } from "./app/jobs/openAIQueue"; // Assuming that serverAdapter is exported from the file where you defined it
import analyticsRouter from "./app/routers/analytics/analyticsRouter";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

dotenv.config();

const connectToDBs = async () => {
  try {
    await mongoose.createConnection(`mongodb://localhost:27017/main`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true,
    } as ConnectOptions);
    console.log("connected to safe-mongo");
  } catch (e) {
    console.error(e.message);
  }
};

connectToDBs().catch((err) => console.error(err.message));

const app = express();
const port = process.env.PORT || 6555;
export const ocClientDomain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5998"
    : "https://oc.failean.com";

export const clientDomain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5999"
    : "https://dev.failean.com";

export const ocServerDomain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:6777"
    : "https://tstocserver.failean.com";

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: [ocClientDomain, ocServerDomain, clientDomain],
    credentials: true,
  })
);

app.use((req, res, next) => {
  req.id = uuidv4();
  axios
    .post(
      ocServerDomain + "/log/logExpressRequest",
      {
        uuid: req.id,
        stringifiedReq: safeStringify(req),
      },
      {
        auth: {
          username: "client",
          password: process.env.OCPASS + "xx",
        },
      }
    )
    .catch(() => console.log("error logging general req to oc"));

  const originalSend = res.send;

  res.send = function (...args: [body?: any]) {
    // console.log("Response: ", args[0]);
    axios
      .post(
        ocServerDomain + "/log/logExpressResponse",
        {
          uuid: req.id,
          stringifiedRes: safeStringify(args[0]),
        },
        {
          auth: {
            username: "client",
            password: process.env.OCPASS + "xx",
          },
        }
      )
      .catch((err) => console.log(err));

    return originalSend.apply(this, args);
  };

  next();
});

app.use("/accounts", accountsRouter);
app.use("/auth", authRouter);
app.use("/website", websiteRouter);
app.use("/analytics", analyticsRouter);
app.use("/data", dataRouter);
app.use("/gql", gqlRouter);
app.get("/areyoualive", (_, res) => {
  res.json({ answer: "yes", version: process.env.npm_package_version });
});

if (process.env.NODE_ENV === "production") {
  app.use(
    "/admin/queues",
    expressBasicAuth({
      users: { [process.env.ADMIN_USER + ""]: process.env.ADMIN_PASSWORD + "" },
      challenge: true,
      realm: "Imb4T3st4pp",
    }),
    serverAdapter.getRouter()
  );
} else {
  app.use("/admin/queues", serverAdapter.getRouter());
}

export const pubsub = new RedisPubSub({
  connection: "localhost:6379",
  //process.env.REDIS + "",
});

pubsub.getSubscriber().on("connect", () => {
  console.log("Subscriber connected to Redis");
});
pubsub.getSubscriber().on("error", (error) => {
  console.log("Subscriber failed to connect to Redis", error);
});
pubsub.getPublisher().on("connect", () => {
  console.log("Publisher connected to Redis");
});
pubsub.getPublisher().on("error", (error) => {
  console.log("Publisher failed to connect to Redis", error);
});

const resolvers = {
  Query,
  Mutation,
  Subscription,
};
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const serverConfig = {
  schema,
  context: ({ req, res }: any) => ({ req, res, pubsub }),
};

const apolloServer = new ApolloServer(
  process.env.NODE_ENV === "production"
    ? { ...serverConfig, plugins: [ApolloServerPluginLandingPageDisabled()] }
    : serverConfig
);

const startApolloServer = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const httpServer = createServer(app);

  const wsServer = new Server({
    server: httpServer,
    path: "/graphql",
  });

  useServer(
    {
      schema,
      execute,
      subscribe,
      onConnect: (ctx) => {
        console.log("Client connected");
      },
      onSubscribe: (ctx, msg) => {
        console.log("Received new subscription");
      },
      onOperation: ((message: any, params: any, webSocket: any) => {
        return { ...params, context: { ...(params as any).context, pubsub } };
      }) as any,
    },
    wsServer
  );

  httpServer.listen(port, () => {
    console.log(
      `Server is ready at http://localhost:${port}${apolloServer.graphqlPath}`
    );
    console.log(`Subscriptions ready at ws://localhost:${port}/graphql`);
  });
};
startApolloServer().catch((error) => console.error(error));
