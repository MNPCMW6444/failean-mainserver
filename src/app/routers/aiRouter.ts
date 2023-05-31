import express from "express";
import Idea from "../models/data/ideaModel";
import { Configuration, OpenAIApi } from "openai";

const router = express.Router();

router.post("/validateIdea", async (req, res) => {
  const { ideaId, userId } = req.body;

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

export default router;
