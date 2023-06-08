import { PromptMap, PromptPart } from "@failean/shared-types";

export const convertMaptoTree = (promptMap: PromptMap) => {
  const promptsAndTheirDeps: any = Object.keys(promptMap).map(
    (promptName: string) => ({
      name: promptName,
      array: promptMap[promptName]
        .map(
          (promptPart: PromptPart) =>
            promptPart.type === "variable" && promptPart.content
        )
        .filter((x) => x),
    })
  );
  promptsAndTheirDeps.push({ name: "idea", array: [] });
  let flags: any = [];
  flags.push({ name: "idea", flag: true });

  promptsAndTheirDeps.forEach((one: any) =>
    flags.push({ name: one.name, flag: false })
  );
  let res: any = [];
  res.push({ level: 1, name: "idea" });

  for (let i = 0; i < flags.filter((flag: any) => !flag.flag).length; ) {
    flags
      .filter((flag: any) => !flag.flag)
      .forEach((flagg: any, index: number) => {
        if (index !== 0) {
          const prompt = promptsAndTheirDeps.find(
            (x: any) => x.name === flagg.name
          );
          let satisfied = prompt.array.map((name: string) => {
            const flagO = flags.find((flagx: any) => {
              return { name, f: flagx.name === name };
            });
            return { name, f: flagO.flag };
          });
          let total = true;
          satisfied.forEach(({ f }: { f: boolean }) => {
            if (!f) total = false;
          });
          if (total) {
            res.push({ level: index, prompt: prompt.name });
            console.log(prompt.name);
            flags.find((flag: any) => flag.name === prompt.name).flag = true;
          } else {
            console.log(prompt.name, satisfied);
          }
        }
      });
  }
  return res;
};
