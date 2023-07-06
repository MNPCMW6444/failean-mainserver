import express from "express";
import ideasRouter from "./ideas/ideasRouter";
import promptsRouter from "./prompts/promptsRouter";
import critIQustionireRouter from "./critiqQuestionire/critIQustionireRouter";
const router = express.Router();

router.use("/ideas", ideasRouter);

router.use("/prompts", promptsRouter);

router.use("/critiqQuestionire", critIQustionireRouter);

export default router;
