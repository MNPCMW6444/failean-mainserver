import express from "express";
import axios from "axios";


const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:6777/" : "https://ocserver.failean.com/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
    auth: {
        username: "client",
        password: process.env.OCPASS + "xx",
    },
});

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
