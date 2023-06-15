import {
  PromptName,
  WhiteUser,
  WhiteOpenAIPromise,
} from "@failean/shared-types";
import { Configuration, OpenAIApi } from "openai";

export const callOpenAI = (
  user: WhiteUser,
  prompt: string
): -1 | WhiteOpenAIPromise => {
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
          content:
            "You are a professional who knows anything relevant for startups, business, innovation, product, marketing and financials and more. your tone of voice is professional, decisive and innovative like you are responding to a potential investor. You will first get instructions and then relevant information about our startup that you should consider in order to output the best possible answer. make sure there are no contradictions between your answer and the information provided. stay consistent but do not repeat yourself to much. do not finish answering until you fully completed your task. do not answer general information only information relevant to our startup. First, analyze the information provided and try to find how the information provided can be used in your answer. then execute all your instructions do not spare anything. You always answer straight to the point, do not conclude your answer or start it with referring to the information provided or your task. You will always refer to the startup as 'our' and  'We' for example 'We will target (target audience X) using channels Y to get 100 first early adopters for our startup'. The startups you will work with are all on the idea stage. do not say anything you don't know about what the startup did on the past only about the future and present. ",
        },
        { role: "user", content: prompt },
      ],
    });
    return -1;
  }
  return -1;
};
