import express from "express";
import { ocServerDomain } from "src";
import axios from "axios";

const router = express.Router();

router.post("/render", async (req, res) => {
  axios.post(ocServerDomain + "/log/logPage", { ...req.body });
  return res.status(200);
});

router.post("/sidebar", async (req, res) => {
  axios.post(ocServerDomain + "/log/logSidebar", { ...req.body });
  return res.status(200);
});
export default router;
