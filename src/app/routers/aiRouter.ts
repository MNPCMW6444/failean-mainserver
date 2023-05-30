import express from "express";
import axios from "axios";
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
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt,
      temperature: 0,
      max_tokens: 7,
    });

    return res.status(200).json({
      response,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: JSON.stringify(err) });
  }
});

export default router;
