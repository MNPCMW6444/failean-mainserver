import {
  PromptMap,
  PromptPart,
  RoleMap,
  WhiteModels,
} from "@failean/shared-types";
import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessage,
  CreateChatCompletionResponse,
} from "openai";
import { roleMap } from "../../../../content/prompts/roleMap";
import ideaModel from "../../../mongo-models/data/ideas/ideaModel";
import PromptResultModel from "../../../mongo-models/data/prompts/promptResultModel";
import aideatorPromptMap from "../../../../content/prompts/aideatorPromptMap";
import { encode } from "gpt-3-encoder";
import { amendTokens, tokenCount } from "../../accounts/tokensUtil";
import { AxiosResponse } from "axios";

const ROI = 3;

type WhiteUser = WhiteModels.Auth.WhiteUser;

export const estimateOpenAI = async (
  user: WhiteUser,
  ideaID: string,
  promptName: keyof PromptMap,
  feedback?: string
): Promise<undefined | number> => {
  if (promptName === "idea") return 0;
  const idea = await ideaModel.findById(ideaID);
  let dependencies: string[];
  const prompt = aideatorPromptMap[promptName];
  if (prompt) {
    let promises = prompt.prompt.map(async (promptPart: PromptPart) => {
      if (promptPart.type === "variable" && promptPart.content !== "idea") {
        let promptRes = await PromptResultModel.find({
          owner: user._id,
          ideaID,
          promptName: promptPart.content,
        });
        return {
          x: promptRes[promptRes.length - 1]?.data,
        };
      }
    });

    return Promise.all(promises).then(async (updatedPropmtResult) => {
      dependencies = updatedPropmtResult.map((r: any) => {
        return r;
      });

      const cleanDeps: string[] = [];
      dependencies.forEach((dep) => {
        if (dep) cleanDeps.push(dep);
      });
      let i = 0;

      let missing = false;

      const constructedPrompt = prompt.prompt.map((promptPart: PromptPart) => {
        if (promptPart.type === "static") return promptPart.content;
        else if (promptPart.type === "variable") {
          if (promptPart.content === "idea") return idea?.idea;
          i++;
          const res = (cleanDeps[i - 1] as any)?.x;
          missing = !missing && !(res?.length > 1);
          return missing ? "a".repeat(3000) : res;
        }
      });

      const promptResult =
        feedback?.length &&
        feedback?.length > 1 &&
        (await PromptResultModel.find({
          owner: user._id,
          ideaID,
          promptName,
        }));

      const input = JSON.stringify(
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
      return encode(input).length;
    });
  }
};
export const callOpenAI = async (
  user: WhiteUser,
  roleName: keyof RoleMap,
  chat: Array<ChatCompletionRequestMessage>
): Promise<AxiosResponse<CreateChatCompletionResponse, any> | -1 | -2> => {
  const role = roleMap[roleName];
  if (user.subscription === "free") {
    return -1;
  }

  if (user.subscription === "premium") {
    return -1;
  }

  if (user.subscription === "tokens") {
    const configuration = new Configuration({
      apiKey: process.env.COMPANY_OPENAI_KEY,
    });

    const openai = new OpenAIApi(configuration);
    if ((await tokenCount(user._id)) > 0) {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: role,
          },
          ...chat,
        ],
      });

      completion.data.usage &&
        amendTokens(
          user,
          0 - completion.data.usage.total_tokens * ROI * 0.04,
          "callopenai"
        );

      return completion as any;
    } else return -2;
  }
  return -1;
};
