import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./app/routers/authRouter";
import websiteRouter from "./app/routers/websiteRouter";
import dataRouter from "./app/routers/dataRouter";
import promptMap from "./content/prompts/promptMap";
import { convertMaptoGraph } from "./app/util/promptUtils";

// index.ts

// Import other required modules...
import { startMonitoring } from './monitoring';

// Setup other parts of your app...

// Start monitoring
startMonitoring();

// Start your server...



dotenv.config();

const app = express();
const port = process.env.PORT || 6555;
app.use(cookieParser());

let mainDbStatus = false;

const connectToDBs = () => {
  try {
    mongoose.connect("mongodb+srv://flighter98311:AXFlvqKDPt0uEOLI@cluster0.q6edqhn.mongodb.net/faileansdfhgjkas", 
  {
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
        : [`${clientDomain}`],
    credentials: true,
  })
);

app.listen(port, () => console.log(`Server started on port: ${port}`));

app.get("/areyoualive", (_, res) => {
  res.json({ answer: "yes", version: process.env.npm_package_version });
});

app.use("/auth", authRouter);
app.use("/website", websiteRouter);
app.use("/data", dataRouter);

try {
  if (process.env.YOAD_FLAG === "dflkgmgj") {
    const tree = convertMaptoGraph(promptMap);
    console.log(tree);
  }
} catch (e) {}
