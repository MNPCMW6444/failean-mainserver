import { PromptMap, PromptPart } from "@failean/shared-types";

export const convertMaptoGraph = (promptMap: PromptMap) => {
  let superPrompts = Object.keys(promptMap).map((promptName: string) => ({
    name: promptName,
    deps: promptMap[promptName]
      .map(
        (promptPart: PromptPart) =>
          promptPart.type === "variable" && promptPart.content
      )
      .filter((x) => x) as string[],
    level: 0,
  }));
  superPrompts.unshift({ name: "idea", deps: [], level: 0 });
  let level = 0;
  while (superPrompts.filter(({ level }) => !level).length > 0) {
    level++;
    superPrompts
      .filter(({ level }) => !level)
      .forEach((sp, index) => {
        sp.level = level - 1;
        superPrompts = [...superPrompts, sp];
        superPrompts.splice(index, 1);
      });
    superPrompts
      .filter(({ level }) => !level)
      .forEach((sp: any, index: number) => {
        let satisfied = sp.deps
          .map(
            (name: string) =>
              superPrompts.find((spx) => spx.name === name)?.name
          )
          .map(
            (name: string) =>
              !name || superPrompts.find((spxx) => spxx.name === name)?.level
          );
        let total = true;
        satisfied.forEach((f: boolean) => {
          if (!f) total = false;
        });
        if (total) {
          sp.level = 0;
          superPrompts = [...superPrompts, sp];
          superPrompts.splice(index, 1);
        }
      });
  }
  let graph = superPrompts.map(({ name, level }) => ({
    name,
    level,
  }));
  return graph;
};
