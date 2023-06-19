import { v4 as uuidv4 } from "uuid";
import express from "express";
import { pubsub } from "../../index";
import openAIQueue from "../util/openAIQueue";
import { Configuration, OpenAIApi } from "openai";
import { roleMap } from "../../content/prompts/roleMap";

const configuration = new Configuration({
  apiKey: process.env.COMPANY_OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();

app.post("/startChatJob", async (req, res) => {
  const { user, roleName, chat } = req.body;

  const jobId = uuidv4();

  openAIQueue.add(
    {
      user,
      roleName,
      chat,
    },
    { jobId }
  );

  res.json({ jobId });
});

openAIQueue.process(async (job) => {
  const { user, roleName, chat } = job.data;

  const role = roleMap[roleName];
  if (user.subscription === "free") {
    return -1;
  }

  if (user.subscription === "premium") {
    return -1;
  }

  if (user.subscription === "tokens") {
    const openAIPromise = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: role,
        },
        ...chat,
      ],
    });

    // Publish updates via GraphQL subscription
    pubsub.publish("jobUpdate", {
      jobUpdate: { id: job.id, status: "completed" },
    });
  }
});
