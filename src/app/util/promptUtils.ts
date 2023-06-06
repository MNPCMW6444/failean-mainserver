import { PromptMap } from "../../content/promptMap";

export const convertMaptoTree = (promptMap: PromptMap): TreeNode => {
  // Dictionary to track nodes that have already been visited
  let visited: { [nodeName: string]: boolean } = {};

  // Function to recursively find children of each node
  const findChildren = (nodeName: string): TreeNode[] => {
    visited[nodeName] = true;

    let children: TreeNode[] = [];
    for (let key in promptMap) {
      if (visited[key]) continue;

      for (let part of promptMap[key]) {
        if (part.type === "variable" && part.content === nodeName) {
          children.push({ name: key, children: findChildren(key) });
          break;
        }
      }
    }
    return children;
  };

  // Start building the tree from 'idea' node
  return { name: "idea", children: findChildren("idea") };
};
