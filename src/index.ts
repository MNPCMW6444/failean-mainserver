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

dotenv.config();

const app = express();
const port = process.env.PORT || 6555;
app.use(cookieParser());

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

app.use(express.json());

export const clientDomain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5999"
    : "https://dev.failean.com";

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? ["http://localhost:5999"]
        : [`${clientDomain}`, "https://oc.failean.com"],
    credentials: true,
  })
);

export const pubsub = new RedisPubSub({
  connection: process.env.REDIS + "",
});

const resolvers = {
  Query,
  Mutation,
  Subscription,
};

const serverConfig = {
  typeDefs,
  resolvers,
  context: ({ req, res }: any) => ({ req, res, pubsub }),
};

const server = new ApolloServer(
  process.env.NODE_ENV === "production"
    ? { ...serverConfig, plugins: [ApolloServerPluginLandingPageDisabled()] }
    : serverConfig
);

app.get("/areyoualive", (_, res) => {
  res.json({ answer: "yes", version: process.env.npm_package_version });
});

app.use("/auth", authRouter);
app.use("/website", websiteRouter);

app.use("/data", dataRouter);

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

// Call the async function
startApolloServer().catch((error) => console.error(error));

app.listen(port, () => console.log(`Server started on port: ${port}`));

app.use("/gql", gqlRouter);
