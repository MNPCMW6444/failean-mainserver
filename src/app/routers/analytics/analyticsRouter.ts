import express from "express";
import { ocserverAxiosInstance } from "../../setup/expressSetup";

const router = express.Router();

router.post("/render", async (req, res) => {
  try {
    await ocserverAxiosInstance.post("log/logPage", { ...req.body });
    return res.status(200).json({ msg: "suc" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "error" });
  }
});

router.post("/sidebar", async (req, res) => {
  ocserverAxiosInstance
    .post("/log/logSidebar", { ...req.body })
    .catch((err: any) => console.error(err));
  return res.status(200);
});
export default router;
