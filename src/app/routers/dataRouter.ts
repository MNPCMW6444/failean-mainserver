import express from "express";
import ideaModel from "../models/data/ideaModel";
import { Configuration, OpenAIApi } from "openai";
import promptMap from "../../content/prompts/promptMap";
import PromptResultModel from "../models/data/promptResultModel";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { convertMaptoTree } from "../util/promptUtils";
import { PromptPart } from "@failean/shared-types";

const router = express.Router();

router.get("/getPromptTree", async (req, res) => {
  try {
    const tree = convertMaptoTree(promptMap);
    return res.status(200).json({
      tree,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

router.get("/getIdeas", async (req, res) => {
  try {
    const token = req.cookies.jsonwebtoken;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized." });
    const validatedUser = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as any
    );
    let hisIdeas = await ideaModel.find({ owner: (validatedUser as any).id });
    return res.status(200).json({
      ideas: hisIdeas
        .map((idea: any) => idea._doc)
        .sort(
          (a: any, b: any) => b.updatedAt.getTime() - a.updatedAt.getTime()
        ),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

router.post("/saveIdea", async (req, res) => {
  try {
    const token = req.cookies.jsonwebtoken;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized." });
    const validatedUser = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as any
    );
    const { idea } = req.body;
    await new ideaModel({
      owner: (validatedUser as any).id,
      idea,
    }).save();

    return res.status(200).json({ message: "Idea created" });
  } catch (err) {
    console.log(err);
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

    const { ideaId, promptName }: { ideaId: string; promptName: string } =
      req.body;

    const promptResult = await PromptResultModel.find({
      owner: userId,
      ideaId,
      promptName,
    });

    return res.status(200).json({
      promptResult,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

router.post("/runAndGetPromptResult", async (req, res) => {
  try {
    const token = req.cookies.jsonwebtoken;
    if (!token) return res.status(401).json({ clientMessage: "Unauthorized" });
    const validatedUser = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string
    );
    const userId = (validatedUser as JwtPayload).id;

    const { ideaId, promptName }: { ideaId: string; promptName: string } =
      req.body;

    const idea = await ideaModel.findById(ideaId);

    let dependencies: string[];

    const prompt = promptMap[promptName];
    if (prompt) {
      let promises = prompt.map(async (promptPart: PromptPart) => {
        if (promptPart.type === "variable" && promptPart.content !== "idea") {
          let promptRes = await PromptResultModel.find({
            owner: userId,
            promptName: promptPart.content,
          });
          return {
            x: promptRes.length > 0 && promptRes[promptRes.length - 1].data,
          };
        }
      });
      Promise.all(promises).then(async (updatedPropmtResult) => {
        dependencies = updatedPropmtResult.map((r: any) => {
          return r;
        });

        let i = 0;

        const constructedPrompt = prompt.map((promptPart: PromptPart) => {
          if (promptPart.type === "static") return promptPart.content;
          else if (promptPart.type === "variable") {
            if (promptPart.content === "idea") return idea;
            i++;
            return (dependencies[i - 1] as any)?.x;
          }
        });

        const configuration = new Configuration({
          apiKey: process.env.COMPANY_OPENAI_KEY,
        });

        const openai = new OpenAIApi(configuration);

        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: constructedPrompt.join("") },
          ],
        });
        const savedResult = new PromptResultModel({
          owner: userId,
          ideaId,
          promptName,
          data: completion.data.choices[0].message?.content,
        });
        await savedResult.save();
        return res.status(200).json({
          response: savedResult.data,
        });
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
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
    }: { ideaId: string; promptName: string; data: string } = req.body;

    const savedPromptResukt = new PromptResultModel({
      owner: userId,
      ideaId,
      promptName,
      data,
    });
    await savedPromptResukt.save();
    return res.status(200).json({
      response: savedPromptResukt.data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

export default router;
