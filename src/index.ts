import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./app/routers/authRouter";
import dataRouter from "./app/routers/dataRouter";
import aiRouter from "./app/routers/aiRouter";
import promptMap, { PromptMap } from "./content/promptMap";
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
    console.log("total: ", order.length);
  }
} catch (e) {}

interface TreeNode {
  name: string;
  children: TreeNode[];
}

function buildPromptTree(promptMap: PromptMap): TreeNode {
  // Dictionary to track nodes that have already been visited
  let visited: { [nodeName: string]: boolean } = {};

  // Function to recursively find children of each node
  const findChildren = (nodeName: string): TreeNode[] => {
    visited[nodeName] = true;

    let children: TreeNode[] = [];
    for (let key in promptMap) {
      if (visited[key]) continue;

      for (let part of promptMap[key]) {
        if (part.type === "variable" && part.content === nodeName) {
          children.push({ name: key, children: findChildren(key) });
          break;
        }
      }
    }
    return children;
  };

  // Start building the tree from 'idea' node
  return { name: "idea", children: findChildren("idea") };
}

const promptTree = buildPromptTree(promptMap);
console.log(JSON.stringify(promptTree, null, 2));
