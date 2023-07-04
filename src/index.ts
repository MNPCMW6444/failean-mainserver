import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./app/routers/auth/authRouter";
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

dotenv.config();

let mainDbStatus = false;
const connectToDBs = () => {
  try {
    mongoose.connect("" + process.env.SAFE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    mainDbStatus = true;
  } catch (e) {
    console.error(e);
    mainDbStatus = false;
  }
  if (!mainDbStatus) setTimeout(connectToDBs, 180000);
  else console.log("connected to safe-mongo");
};

connectToDBs();

const app = express();
const port = process.env.PORT || 6555;
export const ocURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:6777"
    : "https://tstocserver.failean.com";

export const clientDomain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5999"
    : "https://dev.failean.com";

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? ["http://localhost:5999"]
        : [`${clientDomain}`, "https://oc.failean.com"],
    credentials: true,
  })
);

app.use((req, _, next) => {
  axios
    .post(ocURL + "/log/logReq", { stringified: safeStringify(req) })
    .catch((e) => console.log("error logging general req to oc"));
  next();
});
app.use("/auth", authRouter);
app.use("/website", websiteRouter);
app.use("/data", dataRouter);
app.use("/gql", gqlRouter);
app.get("/areyoualive", (_, res) => {
  res.json({ answer: "yes", version: process.env.npm_package_version });
});

export const pubsub = new RedisPubSub({
  connection: process.env.REDIS + "",
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
