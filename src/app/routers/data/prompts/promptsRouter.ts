import express from "express";
import PromptResultModel from "../../../mongo-models/data/prompts/promptResultModel";
import { PromptName } from "@failean/shared-types";
import { addJobsToQueue } from "../../../jobs/openAIQueue";
import {
  convertMaptoDeckGraph,
  convertMaptoDepGraph,
} from "../../../util/data/prompts/promptUtil";
import aideatorPromptMap from "../../../../content/prompts/aideatorPromptMap";
import { authUser } from "../../../util/authUtil";
import { API } from "@failean/shared-types";
import { estimateOpenAI } from "../../../util/data/prompts/openAIUtil";

const router = express.Router();

router.get("/getPromptGraph", async (_, res) => {
  try {
    const graph = convertMaptoDepGraph(aideatorPromptMap);
    return res.status(200).json({
      graph,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

router.get("/getDeckPromptGraph", async (_, res) => {
  try {
    const graph = convertMaptoDeckGraph();
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

    if (promptName === "all") {
      const promptResults = await PromptResultModel.find({
        owner: user._id,
        ideaId,
      });

      return res.status(200).json({
        promptResult: promptResults,
      });
    }

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

    const {
      ideaId,
      promptNames,
      feedback,
    }: API.Data.RunAndGetPromptResult.Req = req.body;

    const price = await Promise.all(
      promptNames.map((promptName) =>
        estimateOpenAI(user, ideaId, promptName, feedback)
      )
    ).then((results) =>
      results.reduce(
        (total, number) =>
          (total !== null && total !== undefined ? total : 99999999) +
          (number !== null && number !== undefined ? number : 99999999),
        0
      )
    );

    return res
      .status(200)
      .json({ price: Math.floor(((price || 100) * 8) / 100) });
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

    const {
      ideaId,
      promptNames,
      feedback,
    }: API.Data.RunAndGetPromptResult.Req = req.body;

    await addJobsToQueue(user, ideaId, promptNames, feedback, req);

    return res.status(200).json({ addedJobSequence: true });
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
      reason,
    }: {
      ideaId: string;
      promptName: PromptName;
      data: string;
      reason: string;
    } = req.body;

    const savedPromptResult = new PromptResultModel({
      owner: user._id,
      ideaId,
      promptName,
      data,
      reason,
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
