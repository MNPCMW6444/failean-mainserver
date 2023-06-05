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
  for (const promptName in dependencyTree) {
    if (
      Object.values(dependencyTree[promptName]).every((value) => value === true)
    ) {
      dependencyTree[promptName] = Object.keys(dependencyTree[promptName]);
    }
  }
  return dependencyTree;
};

export const getDependencyOrder = (
  dependencyTree: any,
  promptName: string,
  seen = new Set<string>(),
  order: any[] = []
): string[] => {
  const dependents = dependencyTree[promptName];
  if (!dependents) {
    return order;
  }
  const addDependent = (dependent: string) => {
    if (!seen.has(dependent)) {
      seen.add(dependent);
      getDependencyOrder(dependencyTree, dependent, seen, order);
      order.push(dependent);
    }
  };
  if (Array.isArray(dependents)) {
    dependents.forEach(addDependent);
  } else {
    Object.keys(dependents).forEach(addDependent);
  }
  return order.reverse();
};
