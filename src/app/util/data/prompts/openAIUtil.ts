import { RoleMap, WhiteUser } from "@failean/shared-types";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { roleMap } from "../../../../content/prompts/roleMap";

export const callOpenAI = async (
  user: WhiteUser,
  roleName: keyof RoleMap,
  chat: Array<ChatCompletionRequestMessage>
): Promise<any> => {
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

    return await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: role,
        },
        ...chat,
      ],
    });
  }
  return -1;
};
