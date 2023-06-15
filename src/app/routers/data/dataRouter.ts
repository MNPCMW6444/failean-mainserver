import express from "express";
import ideaModel from "../../models/data/ideaModel";
import promptMap from "../../../content/prompts/promptMap";
import PromptResultModel from "../../models/data/promptResultModel";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { convertMaptoDepGraph } from "../../util/data/promptUtil";
import { PromptName, PromptPart, WhiteUser } from "@failean/shared-types";
import { callOpenAI } from "../../util/data/openAIUtil";
import userModel from "../../models/auth/userModel";

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

    const { ideaId, promptName }: { ideaId: string; promptName: PromptName } =
      req.body;

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

        const completion = callOpenAI(
          user as unknown as WhiteUser,
          constructedPrompt.join(""),
          prompt.role
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
