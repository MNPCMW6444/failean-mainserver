import express from "express";
import ideaModel from "../../../mongo-models/data/ideas/ideaModel";
import promptMap from "../../../../content/prompts/promptMap";
import PromptResultModel from "../../../mongo-models/data/prompts/promptResultModel";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { PromptName, PromptPart, WhiteUser } from "@failean/shared-types";
import { callOpenAI } from "../../../util/data/prompts/openAIUtil";
import userModel from "../../../mongo-models/auth/userModel";

const router = express.Router();

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
      feedback,
    }: { ideaId: string; promptName: PromptName; feedback?: string } = req.body;

    const idea = await ideaModel.findById(ideaId);

    let dependencies: string[];

    const prompt = promptMap[promptName];
    if (prompt) {
      let promises = prompt.prompt.map(async (promptPart: PromptPart) => {
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

        const constructedPrompt = prompt.prompt.map(
          (promptPart: PromptPart) => {
            if (promptPart.type === "static") return promptPart.content;
            else if (promptPart.type === "variable") {
              if (promptPart.content === "idea") return idea?.idea;
              i++;
              return (cleanDeps[i - 1] as any)?.x;
            }
          }
        );

        const user = userModel.findById(userId);

        const promptResult =
          feedback?.length &&
          feedback?.length > 1 &&
          (await PromptResultModel.find({
            owner: userId,
            ideaId,
            promptName,
          }));

        const completion = callOpenAI(
          user as unknown as WhiteUser,
          prompt.role,
          promptResult && [promptResult.length - 1] &&
            promptResult[promptResult.length - 1].data
            ? [
                { role: "user", content: constructedPrompt.join("") },
                {
                  role: "assistant",
                  content: promptResult[promptResult.length - 1].data,
                },
                { role: "user", content: feedback },
              ]
            : [{ role: "user", content: constructedPrompt.join("") }]
        );

        const savedResult = new PromptResultModel({
          owner: userId,
          ideaId,
          promptName,
          data: (completion as any).data.choices[0].message?.content,
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
