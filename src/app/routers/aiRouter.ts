import express from "express";
import Idea from "../models/data/ideaModel";
import { Configuration, OpenAIApi } from "openai";
import promptMap, { PromptPart } from "src/content/promptMap";
import PromptResult from "../models/data/promptResultModel";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

const router = express.Router();

router.post("/getPromptResult", async (req, res) => {
  const { promptName } = req.body;

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
    });

    return res.status(200).json({
      response: completion.data.choices[0].message?.content,
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
    process.env.jsonwebtoken_SECRET as string
  );
  const userId = (validatedUser as JwtPayload).id;

  const { promptName }: { promptName: string } = req.body;

  try {
    const prompt = promptMap[promptName];

    let promises = prompt.map(
      async (promptPart: PromptPart) =>
        promptPart.type === "variable" &&
        (await PromptResult.find({
          owner: userId,
          promptName: promptName,
        }))
    );
    Promise.all(promises).then((updatedPropmtResult) => {
      console.log(updatedPropmtResult);
      ///???? and false ????  - - --  2  ???
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Missing prompt dependency" });
  }

  try {
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
    });

    return res.status(200).json({
      response: completion.data.choices[0].message?.content,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

export default router;
