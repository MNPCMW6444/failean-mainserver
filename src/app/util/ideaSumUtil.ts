import express from "express";
import { Configuration, OpenAIApi } from "openai";
import PromptResultModel from "../models/data/promptResultModel";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

const router = express.Router();

router.post("/summarizeRefinedIdea", async (req, res) => {
  try {
    const token = req.cookies.jsonwebtoken;
    if (!token) return res.status(401).json({ clientMessage: "Unauthorized" });
    const validatedUser = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string
    );
    const userId = (validatedUser as JwtPayload).id;

    const { ideaId } = req.body;

    const refinedIdeaResult = await PromptResultModel.findOne({
      owner: userId,
      ideaId,
      promptName: "refinedIdea",
    });

    if (!refinedIdeaResult) {
      return res.status(400).json({ errorMessage: "Refined idea not found." });
    }

    const prompt = `Please summarize the following refined idea into one sentence Here are some more pointers; First, avoid using adjectives, particularly superlatives. Never say "first", "only", "huge" or "best" as these words signal inexperience. Second, properly define your target market. For example, "women" or "small businesses" are way too large and not nearly targeted enough. Finally, keep it short. It's easy to write a long sentence, but the right thing is to be concise.: ${refinedIdeaResult.data}`;

    const configuration = new Configuration({
      apiKey: process.env.COMPANY_OPENAI_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      
      messages: [
        {
          role: "system",
          content: "Your only fuction is summerizing startup ideas to 1 sentence. You will be provided with a startup idea, summerize it using the following format No matter what you will always answer only in the following format and include nothing but it in your answer. choosh the words that best describe the idea: [a defined offering] to help [a defined audience] [solve a problem] using [secret sauce]. Example - 'A platform that uses AI to personalize reading recommendations across thousands of independent bookshops.' 'An app that leverages machine learning to recommend personalized nutrition and exercise routines for pets.' 'A blockchain-based service for verifying the authenticity of collectible items.' 'A virtual reality platform for recreating historical events for immersive education.' 'A social network focused on sustainable living, sharing tips, products, and initiatives to reduce individual carbon footprints.' 'A mobile application that connects home cooks with local consumers for homemade meal deliveries.' 'A subscription service for renting high-end fashion items, promoting sustainable fashion and reducing waste.' 'A platform that enables musicians to host virtual concerts with ticketing options for fans.'",
        },
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
