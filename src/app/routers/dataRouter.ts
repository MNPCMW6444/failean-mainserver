import express from "express";
import ideaModel from "../models/data/ideaModel";
import { Configuration, OpenAIApi } from "openai";
import promptMap from "../../content/prompts/promptMap";
import PromptResultModel from "../models/data/promptResultModel";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { convertMaptoGraph } from "../util/promptUtils";
import { PromptPart } from "@failean/shared-types";

const router = express.Router();

router.get("/getPromptGraph", async (_, res) => {
  try {
    const graph = convertMaptoGraph(promptMap);
    return res.status(200).json({
      graph,
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
    let hisIdeas = await ideaModel.find({
      owner: (validatedUser as any).id,
      archived: false,
    });
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
    const { idea, ideaId } = req.body;
    try {
      const ideaToUpdate = await ideaModel.findById(ideaId);
      if (ideaToUpdate) {
        ideaToUpdate.idea = idea;
        await ideaToUpdate.save();
        return res.status(200).json({ message: "Idea updated" });
      }
    } catch (err) {}
    await new ideaModel({
      owner: (validatedUser as any).id,
      idea,
    }).save();
    return res.status(200).json({ message: "Idea saved" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

router.post("/archiveIdea", async (req, res) => {
  try {
    const token = req.cookies.jsonwebtoken;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized." });
    const validatedUser = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as any
    );
    const { ideaId } = req.body;
    const ideaToUpdate = await ideaModel.findById(ideaId);
    if (
      ideaToUpdate &&
      ideaToUpdate.owner.toString() === (validatedUser as any).id
    ) {
      ideaToUpdate.archived = true;
      await ideaToUpdate.save();
      return res.status(200).json({ message: "Idea updated" });
    } else
      return res
        .status(401)
        .json({ errorMessage: "Unauthorized, not your idea" });
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
      promptResult: promptResult[promptResult.length - 1],
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
            ideaId,
            promptName: promptPart.content,
          });
          return {
            x: promptRes[promptRes.length - 1].data,
          };
        }
      });
      Promise.all(promises).then(async (updatedPropmtResult) => {
        dependencies = updatedPropmtResult.map((r: any) => {
          return r;
        });

        const cleanDeps: string[] = [];
        dependencies.forEach((dep) => {
          if (dep) cleanDeps.push(dep);
        });
        let i = 0;

        const constructedPrompt = prompt.map((promptPart: PromptPart) => {
          if (promptPart.type === "static") return promptPart.content;
          else if (promptPart.type === "variable") {
            if (promptPart.content === "idea") return idea?.idea;
            i++;
            return (cleanDeps[i - 1] as any)?.x;
          }
        });

        const configuration = new Configuration({
          apiKey: process.env.COMPANY_OPENAI_KEY,
        });

        const openai = new OpenAIApi(configuration);

        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a professional who knows anything relevant for startups, business, innovation, product, marketing and financials and more. your tone of voice is professional, decisive and innovative like you are responding to a potential investor. You will first get instructions and then relevant information about our startup that you should consider in order to output the best possible answer. make sure there are no contradictions between your answer and the information provided. stay consistent but do not repeat yourself to much. do not finish answering until you fully completed your task. do not answer general information only information relevant to our startup. First, analyze the information provided and try to find how the information provided can be used in your answer. then execute all your instructions do not spare anything. You always answer straight to the point, do not conclude your answer or start it with referring to the information provided or your task. You will always refer to the startup as 'our' and  'We' for example 'We will target (target audience X) using channels Y to get 100 first early adopters for our startup'. The startups you will work with are all on the idea stage. do not say anything you don't know about what the startup did on the past only about the future and present. " },          
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
