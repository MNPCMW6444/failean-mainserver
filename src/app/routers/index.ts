import accountsRouter from "./accounts/accountsRouter";
import analyticsRouter from "./analytics/analyticsRouter";
import authRouter from "./auth/authRouter";
import dataRouter from "./data/dataRouter";
import websiteRouter from "./website/websiteRouter";
import stripeRouter from "./stripe/stripeRouter";
import gqlRouter from "./gqlRouter";

export default {
  accountsRouter,
  analyticsRouter,
  authRouter,
  dataRouter,
  gqlRouter,
  stripeRouter,
  websiteRouter
};
