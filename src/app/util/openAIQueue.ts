import Queue from "bull";
import { pubsub } from "../../index"; // assuming this is the correct relative path
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import ideaModel from "../mongo-models/data/ideas/ideaModel";
import promptMap from "src/content/prompts/promptMap";

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

      const constructedPrompt = prompt.prompt.map((promptPart: PromptPart) => {
        if (promptPart.type === "static") return promptPart.content;
        else if (promptPart.type === "variable") {
          if (promptPart.content === "idea") return idea?.idea;
          i++;
          return (cleanDeps[i - 1] as any)?.x;
        }
      });

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
  

  // You could set job status in Redis here

  // Publish updates via GraphQL subscription
  pubsub.publish("jobUpdate", {
    jobUpdate: { id: job.id, status: "completed" },
  });
};

// Process jobs using the processJob function
openAIQueue.process(processJob);

export default openAIQueue;
