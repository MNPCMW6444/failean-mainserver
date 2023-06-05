import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./app/routers/authRouter";
import dataRouter from "./app/routers/dataRouter";
import aiRouter from "./app/routers/aiRouter";
import promptMap from "./content/promptMap";
import { dependencyMapper, getDependencyOrder } from "./app/util/promptUtils";

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

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? ["http://localhost:5999"]
        : ["https://failean.com"],
    credentials: true,
  })
);

app.listen(port, () => console.log(`Server started on port: ${port}`));

app.get("/areyoualive", (_, res) => {
  res.json({ answer: "yes", version: process.env.npm_package_version });
});

app.use("/auth", authRouter);
app.use("/data", dataRouter);
app.use("/ai", aiRouter);

try {
  if (process.env.YOAD_FLAG === "dflkgmgj") {
    const tree = dependencyMapper(promptMap);
    const order = getDependencyOrder(tree, "idea");
    console.log(order);
  }
} catch (e) {}

// Initialize the dependency tree with empty arrays for each prompt.
const dependencyTree: { [key: string]: string[] } = Object.keys(
  promptMap
).reduce((acc, cur) => ({ ...acc, [cur]: [] }), {});

// Populate the dependency tree.
for (let promptName in promptMap) {
  for (let part of promptMap[promptName]) {
    if (part.type === "variable" && part.content !== promptName) {
      dependencyTree[promptName].push(part.content);
    }
  }
}

const visited: { [key: string]: boolean } = {};
const temp: { [key: string]: boolean } = {};
const result: string[] = [];

function visit(node: string) {
  if (temp[node]) {
    throw new Error("The dependencies contain a cycle.");
  }

  if (!visited[node]) {
    temp[node] = true;
    const dependencies = dependencyTree[node];

    if (Array.isArray(dependencies)) {
      for (const dependency of dependencies) {
        visit(dependency);
      }
    }

    temp[node] = false;
    visited[node] = true;
  }

  // Always push the node to the result, even if it has been visited before.
  result.push(node);
}

visit("idea");

console.log(result);
