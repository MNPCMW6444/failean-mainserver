export const convertMaptoGraph = (promptMap) => {
  let superPrompts = Object.keys(promptMap).map(promptName => ({
    name: promptName,
    deps: promptMap[promptName].filter(promptPart => promptPart.type === "variable" && promptPart.content),
    level: 0,
  }));
  superPrompts.unshift({ name: "idea", deps: [], level: 0 });

  let level = 0;
  while (superPrompts.some(sp => sp.level < 1)) {
    level++;
    superPrompts.filter(sp => sp.level === -1).forEach(sp => {
      sp.level = level - 1;
      superPrompts = [...superPrompts.filter(s => s.name !== sp.name), sp];
    });

    superPrompts.filter(sp => !sp.level).forEach(sp => {
      const satisfied = sp.deps.every(name => {
        const number = superPrompts.find(spx => spx.name === name)?.level;
        return number && number > 0;
      });
      if (satisfied) {
        sp.level = -1;
        superPrompts = [...superPrompts.filter(s => s.name !== sp.name), sp];
      }
    });
  }

  return superPrompts.map(({ name, level }) => ({ name, level }));
};
