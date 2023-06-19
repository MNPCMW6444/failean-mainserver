import express from "express";
import PromptResultModel from "../../../mongo-models/data/prompts/promptResultModel";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { PromptName, PromptPart } from "@failean/shared-types";
import openAIQueue from "../../../util/openAIQueue";
import { convertMaptoDepGraph } from "../../../util/data/prompts/promptUtil";
import promptMap from "../../../../content/prompts/promptMap";
import ideaModel from "src/app/mongo-models/data/ideas/ideaModel";
import userModel from "src/app/mongo-models/auth/userModel";

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
    const token = req.cookies.jsonwebtoken;
    if (!token) return res.status(401).json({ clientMessage: "Unauthorized" });
    const validatedUser = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string
    );
    const userId = (validatedUser as JwtPayload).id;

    const { ideaId, promptName }: { ideaId: string; promptName: PromptName } =
      req.body;

    const promptResult = await PromptResultModel.find({
      owner: userId,
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

router.post("/runAndGetPromptResult", async (req, res) => {
  const token = req.cookies.jsonwebtoken;
  if (!token) return res.status(401).json({ clientMessage: "Unauthorized" });
  const validatedUser = jsonwebtoken.verify(
    token,
    process.env.JWT_SECRET as string
  );
  const user = await userModel.findById((validatedUser as JwtPayload).id);

  const {
    ideaId,
    promptName,
    feedback,
  }: { ideaId: string; promptName: PromptName; feedback?: string } = req.body;

  const job = await openAIQueue.add({ user, ideaId, promptName, feedback });
  res.status(200).json({ jobId: job.id });
});

router.post("/savePromptResult", async (req, res) => {
  try {
    const token = req.cookies.jsonwebtoken;
    if (!token) return res.status(401).json({ clientMessage: "Unauthorized" });
    const validatedUser = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string
    );
    const userId = (validatedUser as JwtPayload).id;

    const {
      ideaId,
      promptName,
      data,
    }: { ideaId: string; promptName: PromptName; data: string } = req.body;

    const savedPromptResult = new PromptResultModel({
      owner: userId,
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
