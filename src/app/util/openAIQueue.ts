import Queue from "bull";
import { pubsub } from "../../index"; // assuming this is the correct relative path
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

// Setup OpenAI
const configuration = new Configuration({
  apiKey: process.env.COMPANY_OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

// Create a new Bull queue
const openAIQueue = new Queue("openAIQueue");

// Define your job processing function
const processJob = async (job: any) => {
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
};

// Process jobs using the processJob function
openAIQueue.process(processJob);

export default openAIQueue;
