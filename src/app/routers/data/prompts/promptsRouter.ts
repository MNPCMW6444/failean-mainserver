import express from "express";
import PromptResultModel from "../../../mongo-models/data/prompts/promptResultModel";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { PromptName } from "@failean/shared-types";
import openAIQueue from "../../../jobs/openAIQueue";
import { convertMaptoDepGraph } from "../../../util/data/prompts/promptUtil";
import promptMap from "../../../../content/prompts/promptMap";
import { authUser } from "../../../util/authUtil";
import { API } from "@failean/shared-types";

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
  try {
    const user = await authUser(req.cookies.jsonwebtoken);

    if (!user) {
      return res.status(401).json({ clientMessage: "Unauthorized" });
    }

    const { ideaId, promptName, feedback }: API.Data.RunAndGetPromptResult.Req =
      req.body;

    console.log("About to add job to queue");
    const job = await openAIQueue.add({ user, ideaId, promptName, feedback });
    console.log("Job added to queue", job);

    return res.status(200).json({ jobId: job.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ clientMessage: "An error occurred" });
  }
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
