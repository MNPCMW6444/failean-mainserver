import { PromptMap, PromptPart } from "@failean/shared-types";

export const convertMaptoDepGraph = (promptMap: PromptMap) => {
  let superPrompts: { name: string; deps: string[]; level: number }[] =
    Object.keys(promptMap).map((promptName) => ({
      name: promptName,
      deps: promptMap[promptName]
        .filter(
          (promptPart: PromptPart) =>
            promptPart.type === "variable" && promptPart.content
        )
        .map((promptPart: PromptPart) => promptPart.content || "") as string[],
      level: 0,
    }));

  superPrompts.unshift({ name: "idea", deps: [], level: 0 });

  let level = 0;

  while (superPrompts.some(({ level }) => level < 1)) {
    level++;

    superPrompts
      .filter(({ level }) => level === -1)
      .forEach((sp) => {
        sp.level = level - 1;
        superPrompts = [
          ...superPrompts.filter(({ name }) => name !== sp.name),
          sp,
        ];
      });

    superPrompts
      .filter(({ level }) => level === 0)
      .forEach((sp) => {
        const satisfied = sp.deps.every((name) => {
          const number = superPrompts.find((spx) => spx.name === name)?.level;
          return number && number > 0;
        });

        if (satisfied) {
          sp.level = -1;
          superPrompts = [
            ...superPrompts.filter(({ name }) => name !== sp.name),
            sp,
          ];
        }
      });
  }

  return superPrompts.map(({ name, level }) => ({ name, level }));
};
