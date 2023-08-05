import {
  PromptMap,
  PromptName,
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
import { getIdeaModel } from "../../../mongo-models/data/ideas/ideaModel";
import { getPromptResultModel } from "../../../mongo-models/data/prompts/promptResultModel";
import aideatorPromptMap from "../../../../content/prompts/aideatorPromptMap";
import { encode } from "gpt-3-encoder";
import { amendTokens, tokenCount } from "../../accounts/tokensUtil";
import { AxiosResponse } from "axios";
import { ocServerDomain } from "../../../setup/config";
import axios from "axios";
import { getSecrets } from "../../../setup/sectets";

const ROI = 2;

type WhiteUser = WhiteModels.Auth.WhiteUser;

export const estimateOpenAI = async (
  user: WhiteUser,
  ideaID: string,
  promptName: keyof PromptMap,
  feedback?: string
): Promise<undefined | number> => {
  const ideaModel = getIdeaModel();
  const PromptResultModel = getPromptResultModel();
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
      return encode(input).length / 3;
    });
  }
};
export const callOpenAI = async (
  user: WhiteUser,
  roleName: keyof RoleMap,
  chat: Array<ChatCompletionRequestMessage>,
  promptName: PromptName,
  openAICallReqUUID: string
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
      apiKey: ((await getSecrets()) as any).OPENAIAPI,
    });

    const openai = new OpenAIApi(configuration);
    if ((await tokenCount(user._id)) > 0) {
      try {
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

        if (completion.data.usage) {
          const priceForUsInCents =
            completion.data.usage?.prompt_tokens * 0.003 +
            completion.data.usage?.completion_tokens * 0.004;
          const forThem = priceForUsInCents * ROI;
          amendTokens(user, 0 - forThem, "callopenai");
          axios
            .post(
              ocServerDomain + "/log/logPromptPrice",
              {
                openAICallReqUUID,
                promptName,
                forAVGPriceInOpenAITokens: forThem,
              },
              {
                auth: {
                  username: "client",
                  password: process.env.OCPASS + "xx",
                },
              }
            )
            .catch((err) => console.error(err));
        }

        return completion as any;
      } catch (err) {
        console.log(err.response.data);
        return -1;
      }
    } else return -2;
  }
  return -1;
};
