import { Prompt, PromptMap, PromptPart } from "@failean/shared-types";
import promptMap from '../../content/prompts/promptMap'; 

const promptGroups:any = {
  "Idea Summary": [
    "refindIdea",
    "startupName",
    "visioStatment",
    "missionStatments",
    "opportunity",
    "problemStatement",
    "targetAudience",
    "solution"
  ],
  "Market": [
    "valueProposition",
    "competitorAnalysis",
    "marketAnalysis",
    "marketSize",
    "branding",
    "slogan",
    "channels",
    "GtmStrategy",
    "marketingCost",
    "CAC"
  ],
  "Product": [
    "IdealCustomerPersona",
    "uniqueValueProposition",
    "mvpUserStories",
    "mvpFeatures",
    "mvpRoadmap",
    "milestines",
    "pricing",
    "mvpDependencies",
    "mvpCost"
  ],
  "Business": [
    "businessModel",
    "unitEconomics",
    "partnerships",
    "operationalCosts",
    "risksAndChallenges"
  ],
  "Financials": [
    "salesForecastMethod",
    "salesVolumeEstimation",
    "revenueProjections"
  ],
  "Funding": [
    "fundingStrategies",
    "potentialInvestors"
  ]
};

export interface GroupedPrompt {
  groupName: string;
  prompt: Prompt;
  level: number;
}

export const groupPromptResults = (promptMap: PromptMap): GroupedPrompt[] => {
  let groupedResults: GroupedPrompt[] = [];

  let level = 0;
  for (let groupName in promptGroups) {
    for(let promptName of promptGroups[groupName]){
      const prompt = promptMap[promptName];
      if(prompt){
        groupedResults.push({
          groupName,
          prompt,
          level
        });
      }
    }
    level++;
  }

  return groupedResults;
};

const sortedPrompts = groupPromptResults(promptMap);
console.log(sortedPrompts);
