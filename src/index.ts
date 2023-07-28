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
import { serverAdapter } from "./app/jobs/openAIQueue";
import analyticsRouter from "./app/routers/analytics/analyticsRouter";
import { discoverService } from "./AWSDiscovery";
import { clientDomain, ocClientDomain, ocServerDomain } from "./config";

dotenv.config();

const resolvers = {
  Query,
  Mutation,
  Subscription,
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

const app = express();
const port = process.env.PORT || 6555;

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: [ocClientDomain, ocServerDomain, clientDomain],
    credentials: true,
  })
);

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
      users: { [`${process.env.ADMIN_USER}`]: `${process.env.ADMIN_PASSWORD}` },
      challenge: true,
      realm: "Imb4T3st4pp",
    }),
    serverAdapter.getRouter()
  );
} else {
  app.use("/admin/queues", serverAdapter.getRouter());
}

let pubsub: RedisPubSub;

async function setup() {
  const redisIp = await discoverService("us-east-1", {
    NamespaceName: "dev",
    ServiceName: "redis-s",
    MaxResults: 10,
  });

  pubsub = new RedisPubSub({
    connection: redisIp + ":6379",
  });
  console.log(`Connecting to Redis at ${redisIp}:6379`);

  pubsub.getSubscriber().on("connect", () => {
    console.log("Subscriber connected to Redis");
  });

  pubsub.getSubscriber().on("error", (error) => {
    console.error("Subscriber failed to connect to Redis", error);
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

  const mongoIp = await discoverService("us-east-1", {
    NamespaceName: "dev",
    ServiceName: "mongo-s",
    MaxResults: 10,
  });

  const connection = mongoose.createConnection(
    `mongodb://${mongoIp}:27017/main`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  );

  connection.on("connected", () => {
    console.log("Connected to safe-mongo");
  });

  connection.on("error", (error) => {
    console.error("Error connecting to safe-mongo:", error.message);
  });

  app.use((req, res, next) => {
    req.id = uuidv4();
    axios
      .post(
        `${process.env.OC_SERVER_DOMAIN}/log/logExpressRequest`,
        {
          uuid: req.id,
          stringifiedReq: safeStringify(req),
        },
        {
          auth: {
            username: "client",
            password: `${process.env.OCPASS}xx`,
          },
        }
      )
      .catch(() => console.log("error logging general req to oc"));

    const originalSend = res.send;

    res.send = function (...args: [body?: any]) {
      axios
        .post(
          `${process.env.OC_SERVER_DOMAIN}/log/logExpressResponse`,
          {
            uuid: req.id,
            stringifiedRes: safeStringify(args[0]),
          },
          {
            auth: {
              username: "client",
              password: `${process.env.OCPASS}xx`,
            },
          }
        )
        .catch((err) => console.log(err));

      return originalSend.apply(this, args);
    };

    next();
  });
}

setup().catch((error) => console.error(error));

export { pubsub };
