import express from "express";


let axiosInstance: AxiosInstance | undefined;

import("@failean/oc-server-axiosinstance").then(module => {
    axiosInstance = module.axiosInstance;
}).catch(err => {
    console.error("Failed to import axiosInstance", err);
});
import {AxiosInstance} from "axios";

const router = express.Router();

router.post("/render", async (req, res) => {
    try {
        await axiosInstance?.post("log/logPage", {...req.body});
        return res.status(200).json({msg: "suc"});
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: "error"});
    }
});

router.post("/sidebar", async (req, res) => {
    axiosInstance?.post("/log/logSidebar", {...req.body})
        .catch((err) => console.error(err));
    return res.status(200);
});
export default router;
