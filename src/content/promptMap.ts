export type PromptPartType = "static" | "variable";
export interface PromptPart {
  type: PromptPartType;
  content: keyof typeof promptMap | "idea";
}
export type Prompt = PromptPart[];
export type PromptMap = Record<string, Prompt>;

export default promptMap;
