import { openAIQueue } from "../util/jobQueue";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { PubSub } from "apollo-server";

const pubsub = new PubSub();

// Setup OpenAI
const configuration = new Configuration({
  apiKey: process.env.COMPANY_OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

// Process jobs in the OpenAI queue
openAIQueue.process(async (job) => {
  const { user, roleName, role, chat } = job.data;

  if (user.subscription !== "tokens") {
    return;
  }

  // Make the actual API call here
  const result = await openai.createChatCompletion({
    model: "gpt-3", // Replace with your desired model
    messages: [
      {
        role: "system",
        content: role,
      },
      ...chat,
    ],
  });

  // You could set job status in Redis here

  // Publish updates via GraphQL subscription
  pubsub.publish("jobUpdate", {
    jobUpdate: { id: job.id, status: "completed" },
  });
});
