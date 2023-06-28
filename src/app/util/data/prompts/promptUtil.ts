import { PromptMap, PromptPart, GroupedPrompt } from "@failean/shared-types";

export const convertMaptoDepGraph = (promptMap: PromptMap) => {
  let superPrompts: { name: string; deps: string[]; level: number }[] =
    Object.keys(promptMap).map((promptName) => ({
      name: promptName,
      deps: promptMap[promptName].prompt
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

  return superPrompts.map(({ name, deps, level }) => ({ name, deps, level }));
};

export const convertMaptoDeckGraph = (promptMap: PromptMap) => {
  let groupedResults: GroupedPrompt[] = [];
  const promptGroups: Record<string, string[]> = {
    ideaSummary: [
      "refindIdea",
      "startupName",
      "visioStatment",
      "missionStatments",
      "opportunity",
      "problemStatement",
      "targetAudience",
      "solution",
    ],
    market: [
      "valueProposition",
      "competitorAnalysis",
      "marketAnalysis",
      "marketSize",
      "branding",
      "slogan",
      "channels",
      "GtmStrategy",
      "marketingCost",
      "CAC",
    ],
    product: [
      "IdealCustomerPersona",
      "uniqueValueProposition",
      "mvpUserStories",
      "mvpFeatures",
      "mvpRoadmap",
      "milestines",
      "pricing",
      "mvpDependencies",
      "mvpCost",
    ],
    business: [
      "businessModel",
      "unitEconomics",
      "partnerships",
      "operationalCosts",
      "risksAndChallenges",
    ],
    financials: [
      "salesForecastMethod",
      "salesVolumeEstimation",
      "revenueProjections",
    ],
    funding: ["fundingStrategies", "potentialInvestors"],
  };

  const critiqPromptGroup: Record<string, string[]> = {
    valueValidation: [
      "refindIdea",
      "valueProposition",
      "uniqueValueProposition",
      "IdealCustomerPersona",
      "pricing",
      "mvpUserStories",
      "mvpFeatures",
    ],
    marketValidation: [
      "refindIdea",
      "marketAnalysis",
      "marketSize",
      "competitorAnalysis",
      "targetAudience",
      "channels",
    ],
    businessValidation: [
      "refindIdea",
      "pricing",
      "businessModel",
      "unitEconomics",
      "partnerships",
      "operationalCosts",
      "risksAndChallenges",
    ],
    teamValidation: ["refindIdea", "teamComposition"],

    economicValidation: [
      "salesVolumeEstimation",
      "revenueProjections",
      "unitEconomics",
      "mvpCost",
      "marketingCost",
      "CAC",
    ],
    legalValidation: ["compliance", "legal", "compliancePrompt3"],
  };

  let level = 0;
  for (const groupName in promptGroups) {
    for (const promptName of promptGroups[groupName]) {
      const prompt = promptMap[promptName];
      if (prompt) {
        groupedResults.push({
          groupName,
          prompt,
          level,
        });
      }
    }
    level++;
  }

  for (const groupName in critiqPromptGroup) {
    for (const promptName of critiqPromptGroup[groupName]) {
      const prompt = promptMap[promptName];
      if (prompt) {
        groupedResults.push({
          groupName,
          prompt,
          level,
        });
      }
    }
    level++;
  }

  return groupedResults;
};
