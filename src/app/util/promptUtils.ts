import { Prompt, PromptMap, PromptPart } from "../../content/promptMap";

export const dependencyMapper = (promptMap: PromptMap) => {
  let dependencyTree: any = {};

  try {
    Object.keys(promptMap).forEach((promptName: string) => {
      const prompt: Prompt = promptMap[promptName];
      dependencyTree[promptName] = {};

      prompt.forEach((promptPart: PromptPart) => {
        if (promptPart.type === "variable") {
          const variableName = promptPart.content;
          if (promptMap[variableName]) {
            // If the variable is another prompt, recursively map its dependencies
            dependencyTree[promptName][variableName] = dependencyMapper({
              [variableName]: promptMap[variableName],
            });
          } else {
            // If the variable is not another prompt, add it as a string
            dependencyTree[promptName][variableName] = variableName;
          }
        }
      });

      // If the prompt has no variables, replace it with a string
      if (Object.keys(dependencyTree[promptName]).length === 0) {
        dependencyTree[promptName] = promptName;
      }
    });
  } catch (e) {
    console.log(e);
  }

  return dependencyTree;
};
