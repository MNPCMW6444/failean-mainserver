import { Prompt, PromptMap, PromptPart } from "../../content/promptMap";

const dependencyMapper = (promptMap: PromptMap) => {
  let dependencyTree: any = {};

  try {
    Object.keys(promptMap).forEach((promptName: string) => {
      const prompt: Prompt = promptMap[promptName];
      let variables: string[] = [];

      prompt.forEach((promptPart: PromptPart) => {
        if (promptPart.type === "variable") {
          const variableName = promptPart.content;
          if (promptMap[variableName]) {
            // Recursive call if the variable is another prompt
            dependencyTree[variableName] = dependencyMapper({
              [variableName]: promptMap[variableName],
            });
          } else {
            // If the variable is not another prompt, add it as a dependency
            variables.push(variableName);
          }
        }
      });

      if (variables.length > 0) {
        dependencyTree[promptName] = {};
        variables.forEach((variable) => {
          dependencyTree[promptName][variable] = variable;
        });
      } else {
        dependencyTree[promptName] = promptName;
      }
    });
  } catch (e) {
    console.log(e);
  }

  return dependencyTree;
};
