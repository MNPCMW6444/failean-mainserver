import { PromptMap } from "../../content/promptMap";

export const dependencyMapper = (promptMap: PromptMap) => {
  const dependencyTree: any = {};

  for (const promptName in promptMap) {
    const prompt = promptMap[promptName];
    for (const part of prompt) {
      if (part.type === "variable") {
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

  const countDependents = (dependencyTree: any, promptName: string): number => {
    let count = 0;
    const dependents = dependencyTree[promptName];
    if (!dependents) {
      return count;
    }

    if (Array.isArray(dependents)) {
      dependents.forEach((dependent) => {
        count += 1 + countDependents(dependencyTree, dependent);
      });
    } else {
      for (const dependent in dependents) {
        count += 1 + countDependents(dependencyTree, dependent);
      }
    }

    return count;
  };

  // Usage example:
  const numberOfDependents = countDependents(dependencyTree, "problemStatment");
  console.log(numberOfDependents);

  return dependencyTree;
};
