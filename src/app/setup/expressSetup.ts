import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressBasicAuth from "express-basic-auth";
import { serverAdapter } from "../jobs/openAIQueue";
import { clientDomain, ocClientDomain } from "./config";
import routers from "../routers";
import { discoverService } from "./AWSDiscovery";
import pack from "../../../package.json";
import { ocserverAxiosInstanceGetter } from "@failean/oc-server-provider";

export const app = express();
export const port = 6555;

export let ocServerDomain = "";
export let ocserverAxiosInstance: any = undefined;

ocserverAxiosInstanceGetter().then((instance: any) => {
  ocserverAxiosInstance = instance;
});

discoverService("us-east-1", {
  NamespaceName: "tst",
  ServiceName: "ocserver",
  MaxResults: 10,
}).then((ip) => {
  const {
    authRouter,
    accountsRouter,
    websiteRouter,
    dataRouter,
    gqlRouter,
    analyticsRouter,
      stripeRouter
  } = routers;
  const axiosLogger = (req: Request, res: Response, next: NextFunction) => {
    next();
  };

  ocServerDomain = `http://${ip}:6777`;
  const middlewares = [
    cookieParser(),
    express.json({ limit: "50mb" }),
    express.urlencoded({ limit: "50mb", extended: true }),
    cors({
      origin: [ocClientDomain, clientDomain],
      credentials: true,
    }),
    axiosLogger,
  ];

  middlewares.forEach((middleware) => app.use(middleware));

  app.use("/accounts", accountsRouter);
  app.use("/auth", authRouter);
  app.use("/website", websiteRouter);
  app.use("/analytics", analyticsRouter);
  app.use("/data", dataRouter);
  app.use("/gql", gqlRouter);
  app.use("/stripe", stripeRouter);

  const { version } = pack;

  app.get("/areyoualive", (_, res) => {
    res.json({ answer: "yes", version });
  });

  if (process.env.NODE_ENV === "production") {
    app.use(
      "/admin/queues",
      expressBasicAuth({
        users: {
          [`${process.env.ADMIN_USER}`]: `${process.env.ADMIN_PASSWORD}`,
        },
        challenge: true,
        realm: "Imb4T3st4pp",
      }),
      serverAdapter.getRouter()
    );
  } else {
    app.use("/admin/queues", serverAdapter.getRouter());
  }
});
