export type PromptPartType = "static" | "variable";
export interface PromptPart {
  type: PromptPartType;
  content: keyof typeof promptMap | "idea";
}
export type Prompt = PromptPart[];
export type PromptMap = Record<string, Prompt>;

const promptMap: PromptMap = {
  validation: [
    {
      type: "static",
      content: "Hi Chattie, Please validate the idea of my user:\n",
    },
    { type: "variable", content: "idea" },
    { type: "static", content: "\nThank you:)" },
  ],
  problemStatment: [
    {
      type: "static",
      content:
        "You are now a Co-Founder and an expireinced entreprenuer. Youre goal is to write a good problem statmrnt. A good problem statement will cover what is the problem, why it's important, and who it impacts (Try giving the number of people/the amount of money lost). A good problem statement should should create awareness and stimulate creative thinking. Define the problem statment shorly based on the following Idea .\n",
    },
    { type: "variable", content: "idea" },
  ],
  visionStatment: [
    {
      type: "static",
      content:
        "Define the vision statment in one sentence. It should be clear and apealing and deliver the positive change the idea will have in the world. use this idea and problem statment to detemine the vision statment   \n",
    },
    { type: "variable", content: "idea" },
    { type: "variable", content: "problemStatment" },
  ],
  solution: [
    {
      type: "static",
      content:
        "Define the soulution statment based on the following Idea, vision and problem statments. \n",
    },
    { type: "variable", content: "idea\n " },
    { type: "variable", content: "visionStatment\n " },
    { type: "variable", content: "problemStatment\n " },
    {
      type: "static",
      content:
        "A good solution statement will cover what is the best practical and effective way to use the idea to solve the problem. It needs to show exactly how the idea solve each part of the problem and the overall problem",
    },
  ],
};

export default promptMap;
