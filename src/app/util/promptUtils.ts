import { PromptMap } from "../../content/promptMap";

export const dependencyMapper = (promptMap: PromptMap) => {
  const dependencyTree: any = {};

  for (const promptName in promptMap) {
    const prompt = promptMap[promptName];
    for (const part of prompt) {
      if (part.type === "variable" && promptMap[part.content.trim()]) {
        if (!dependencyTree[part.content.trim()]) {
          dependencyTree[part.content.trim()] = {};
        }
        dependencyTree[part.content.trim()][promptName] = true;
      }
    }
  }

  // Convert dependencies without any dependent prompts to an array
  for (const promptName in dependencyTree) {
    if (
      Object.values(dependencyTree[promptName]).every((value) => value === true)
    ) {
      dependencyTree[promptName] = Object.keys(dependencyTree[promptName]);
    }
  }

  return dependencyTree;
};
