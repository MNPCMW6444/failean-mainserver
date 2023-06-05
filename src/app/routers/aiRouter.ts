import express from "express";
import Idea from "../models/data/ideaModel";
import { Configuration, OpenAIApi } from "openai";
import promptMap, {
  Prompt,
  PromptMap,
  PromptPart,
} from "../../content/promptMap";
import PromptResult from "../models/data/promptResultModel";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import RawIdea from "../models/data/rawIdeaModel";
import { dependencyMapper } from "../util/promptUtils";

const router = express.Router();

router.post("/getPromptResult", async (req, res) => {
  /* const { promptName } = req.body;

  try {
    const idea = await Idea.findById(ideaId);
    if (!idea) return res.status(404).json({ errorMessage: "Idea not found." });

    const prompt = `Validate the following business idea: ${idea.idea}. Provide a SWOT analysis, and predict the potential for success.`;

    const configuration = new Configuration({
      apiKey: process.env.COMPANY_OPENAI_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    }); */

  return res.status(200).json({
    response: null, //completion.data.choices[0].message?.content,
  });
  /* } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  } */
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

    const lastRawIdeas = await RawIdea.find({ parent: ideaId });
    const idea = lastRawIdeas[lastRawIdeas.length - 1].rawIdea;

    let dependencies: string[];

    const prompt = promptMap[promptName];
    let promises = prompt.map(async (promptPart: PromptPart) => {
      if (promptPart.type === "variable" && promptPart.content !== "idea") {
        let promptRes = await PromptResult.find({
          owner: userId,
          promptName: promptPart.content,
        });
        return { x: promptRes[promptRes.length - 1].data };
      }
    });
    Promise.all(promises).then((updatedPropmtResult) => {
      dependencies = updatedPropmtResult.map((r: any) => {
        return r;
      });
    });

    let i = 0;

    const constructedPrompt = prompt.map((promptPart: PromptPart) => {
      if (promptPart.type === "static") return promptPart.content;
      else if (promptPart.type === "variable") {
        if (promptPart.content === "idea") return idea;
        i++;
        return dependencies[i - 1];
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

    return res.status(200).json({
      response: completion.data.choices[0].message?.content,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

dependencyMapper(promptMap);

export default router;
