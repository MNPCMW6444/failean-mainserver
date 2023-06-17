import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import mongoose, { ConnectOptions } from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./app/routers/auth/authRouter";
import websiteRouter from "./app/routers/website/websiteRouter";
import dataRouter from "./app/routers/data/dataRouter";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./app/typeDefs";
import Query from "./app/resolvers/Query";
import Mutation from "./app/resolvers/Mutation";
import Subscription from "./app/resolvers/Subscription";
import { RedisPubSub } from "graphql-redis-subscriptions";

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

const pubsub = new RedisPubSub();

const resolvers = {
  Query,
  Mutation,
  Subscription,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res, pubsub }),
});

app.get("/areyoualive", (_, res) => {
  res.json({ answer: "yes", version: process.env.npm_package_version });
});

app.use("/auth", authRouter);
app.use("/website", websiteRouter);

app.use("/data", dataRouter);

await app.listen(port, () => console.log(`Server started on port: ${port}`));

server.applyMiddleware({ app });
