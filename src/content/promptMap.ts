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
};
export default promptMap;
