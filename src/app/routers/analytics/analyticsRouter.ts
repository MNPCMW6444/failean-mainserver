import express from "express";
import { ocServerDomain } from "../../setup/config";
import axios from "axios";

const router = express.Router();

router.post("/render", async (req, res) => {
  try {
    await axios.post(
      ocServerDomain + "/log/logPage",
      { ...req.body },
      {
        auth: {
          username: "client",
          password: process.env.OCPASS + "xx",
        },
      }
    );
    return res.status(200).json({ msg: "suc" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "error" });
  }
});

router.post("/sidebar", async (req, res) => {
  axios
    .post(
      ocServerDomain + "/log/logSidebar",
      { ...req.body },
      {
        auth: {
          username: "client",
          password: process.env.OCPASS + "xx",
        },
      }
    )
    .catch((err) => console.error(err));
  return res.status(200);
});
export default router;
