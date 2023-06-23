import express from "express";
import PromptResultModel from "../../../mongo-models/data/prompts/promptResultModel";
import { PromptName } from "@failean/shared-types";
import openAIQueue from "../../../jobs/openAIQueue";
import { convertMaptoDepGraph } from "../../../util/data/prompts/promptUtil";
import promptMap from "../../../../content/prompts/promptMap";
import { authUser } from "../../../util/authUtil";
import { API } from "@failean/shared-types";
import { estimateOpenAI } from "../../../util/data/prompts/openAIUtil";

const router = express.Router();

router.get("/getPromptGraph", async (_, res) => {
  try {
    const graph = convertMaptoDepGraph(promptMap);
    return res.status(200).json({
      graph,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

router.post("/getPromptResult", async (req, res) => {
  try {
    const user = await authUser(req.cookies.jsonwebtoken);

    if (!user) {
      return res.status(401).json({ clientMessage: "Unauthorized" });
    }

    const { ideaId, promptName }: { ideaId: string; promptName: PromptName } =
      req.body;

    const promptResult = await PromptResultModel.find({
      owner: user._id,
      ideaId,
      promptName,
    });

    return res.status(200).json({
      promptResult: promptResult[promptResult.length - 1],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

router.post("/preRunPrompt", async (req, res) => {
  try {
    const user = await authUser(req.cookies.jsonwebtoken);

    if (!user) {
      return res.status(401).json({ clientMessage: "Unauthorized" });
    }

    const { ideaId, promptName, feedback }: API.Data.RunAndGetPromptResult.Req =
      req.body;

    const price = await estimateOpenAI(user, ideaId, promptName, feedback);

    return res.status(200).json({ price: ((price || 100) * 8) / 100 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ clientMessage: "An error occurred" });
  }
});

router.post("/runAndGetPromptResult", async (req, res) => {
  try {
    const user = await authUser(req.cookies.jsonwebtoken);

    if (!user) {
      return res.status(401).json({ clientMessage: "Unauthorized" });
    }

    const { ideaId, promptName, feedback }: API.Data.RunAndGetPromptResult.Req =
      req.body;

    const job = await openAIQueue.add({ user, ideaId, promptName, feedback });

    return res.status(200).json({ jobId: job.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ clientMessage: "An error occurred" });
  }
});

router.post("/savePromptResult", async (req, res) => {
  try {
    const user = await authUser(req.cookies.jsonwebtoken);

    if (!user) {
      return res.status(401).json({ clientMessage: "Unauthorized" });
    }

    const {
      ideaId,
      promptName,
      data,
    }: { ideaId: string; promptName: PromptName; data: string } = req.body;

    const savedPromptResult = new PromptResultModel({
      owner: user._id,
      ideaId,
      promptName,
      data,
    });
    await savedPromptResult.save();
    return res.status(200).json({
      response: savedPromptResult.data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

export default router;
