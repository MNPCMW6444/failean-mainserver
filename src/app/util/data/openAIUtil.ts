import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { roleMap } from "../../../content/prompts/roleMap";
import { RoleMap, WhiteOpenAIPromise, WhiteUser } from "@failean/shared-types";

export const callOpenAI = (
  user: WhiteUser,
  roleName: keyof RoleMap,
  chat: Array<ChatCompletionRequestMessage>
): -1 | WhiteOpenAIPromise => {
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

    const openAIPromise = openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: role,
        },
        ...chat,
      ],
    });
    return -1;
  }
  return -1;
};
