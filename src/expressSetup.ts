declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import expressBasicAuth from "express-basic-auth";
import { serverAdapter } from "./app/jobs/openAIQueue";
import { clientDomain, ocClientDomain, ocServerDomain } from "./config";
import routers from "./app/routers";

const {
  authRouter,
  accountsRouter,
  websiteRouter,
  dataRouter,
  gqlRouter,
  analyticsRouter,
} = routers;

export const app = express();
export const port = process.env.PORT || 6555;

const axiosLogger = (req: Request, res: Response, next: NextFunction) => {
  // Your logger implementation
  // ...
  next();
};

const applyMiddlewares = (app: express.Application) => {
  const middlewares = [
    cookieParser(),
    express.json({ limit: "50mb" }),
    express.urlencoded({ limit: "50mb", extended: true }),
    cors({
      origin: [ocClientDomain, ocServerDomain, clientDomain],
      credentials: true,
    }),
    axiosLogger,
  ];

  middlewares.forEach((middleware) => app.use(middleware));
};

applyMiddlewares(app);

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
