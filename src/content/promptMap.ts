export type PromptPartType = "static" | "variable";

export interface PromptPart {
  type: PromptPartType;
  content: string;
}

export type Prompt = PromptPart[];
export type PromptMap = Record<string, Prompt>;

const promptMap: PromptMap = {
  // ... your prompts here ...
};

const isValidPromptMap = (map: PromptMap): boolean => {
  for (let key in map) {
    for (let part of map[key]) {
      if (
        part.type === "variable" &&
        part.content !== "idea" &&
        !(part.content in map)
      ) {
        console.error(`Invalid content "${part.content}" in prompt "${key}"`);
        return false;
      }
    }
  }
  return true;
};

if (!isValidPromptMap(promptMap)) {
  throw new Error("Invalid PromptMap");
}

export default promptMap;
