import { callOpenAI } from "../util/data/prompts/openAIUtil";

export default async (job: any, done: any) => {
  const { user, roleName, chat } = job.data;

  // Use the callOpenAI function to perform the task and capture the result
  const result = await callOpenAI(user, roleName, chat);

  // Do something with the result (like saving it to the database)

  // Call the done function when finished to indicate that the job is complete
  done(null, result);
};
