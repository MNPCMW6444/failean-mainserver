export type PromptPartType = "static" | "variable";

export interface PromptPart {
  type: PromptPartType;
  content: string;
}

export type Prompt = PromptPart[];
export type PromptMap = Record<string, Prompt>;


const promptMap: PromptMap = {
  validation: [
    {
      type: "static",
      content: "You are now a Co-Founder and an expireinced entreprenuer. Please take this basic idea and make it clear, coherent and investor friendly.\n",
    },
    { type: "variable", content: "idea" },
  ],
  problemStatment: [
    {
      type: "static",
      content: "You are now a Co-Founder and an expireinced entreprenuer. Youre goal is to write a good problem statmrnt. A good problem statement will cover what is the problem, why it's important, and who it impacts (Try giving the number of people/the amount of money lost). A good problem statement should should create awareness and stimulate creative thinking. Define the problem statment shorly based on the following Idea .\n",
    },
    { type: "variable", content: "validation" },
  ],
  visionStatment: [
    {
      type:"static",
      content: "Define the vision statment of my startup in one sentence. It should be clear and apealing and deliver the positive change the idea will have in the world. use this idea and problem statment to detemine the vision statment   \n",
    },
    { type: "variable", content: "validation" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "problemStatment" },

  ],
  missionStatments: [
    {
      type:"static",
      content: "Give me the startup's mission statmmments in an exacutive summery format based on my idea and vision statment \n",
    },
    { type: "variable", content: "validation" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "visionStatment" },

  ],
  branding: [
    {
      type:"static",
      content: "Provide a detailed startup branding strategy. give a list of 3 promises we will make to our customers for example Apple promises customers quality and high social status. It is what our customers expect to get when using our products or servises. Also determine the overall design we should use based on the following idea, missiom statment and target customers. \n",
    },
    { type: "variable", content: "validation" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "missionStatments" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "targetAudience" },

  ],
  targetAudience: [
    {
      type:"static",
      content: "Give me a detailed description of all my potential target audiences based on my startup idea and problem statment. If needed, devide it to 'customers' if they are only paying and 'users' if they only use it. It shuld include he needs, purchase habits, characteristics, and location of the target market \n",
    },
    { type: "variable", content: "validation" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "problemStatment" },

  ],
  starupName: [
    {
      type:"static",
      content: "Give me 10 apealing available startup names based on the following idea and vision statment and make it appealing too my target audience below. Make sure the domain is not taken and there is no company with the same name \n",
    },
    { type: "variable", content: "validation" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "visionStatment" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "targetAudience" },


  ],
  marketSize: [
    {
      type:"static",
      content: "You are the CMO of my new startup company. We are preforming a comperhensive market reaserch. you need to answer the question 'Is there a sufficient demand for our product?' based on the following idea, solution and target audience,  Give an estimation to the market size and the total addresable market (TAM) and the number of potential customers based on   \n",
    },
    { type: "variable", content: "validation" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "solution" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "targetAudience" },


  ],
  businessModel: [
    {
      type:"static",
      content: "You are now the CEO & CBDO of my new startup company. We want to grow as fast as possible so we can be profitable at the near future.  You need to decide on a business model(B2B/B2C/B2B2C/B2M/B2G) and potential revenue streams for our startup. Here is our startup idea, solution and target audiance. for each relevant option give the pros and cons.   \n",
    },
    { type: "variable", content: "validation" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "solution" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "targetAudience" },


  ],
  marketTrends: [
    {
      type:"static",
      content: "Give me 10 apealing available startup names based on the following idea and vision statment and make it appealing too my target audience below. Make sure the domain is not taken and there is no company with the same name \n",
    },
    { type: "variable", content: "validation" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "visionStatment" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "targetAudience" },


  ],
  marketGap: [
    {
      type:"static",
      content: "Give me 10 apealing available startup names based on the following idea and vision statment and make it appealing too my target audience below. Make sure the domain is not taken and there is no company with the same name \n",
    },
    { type: "variable", content: "validation" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "visionStatment" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "targetAudience" },


  ],
  marketSegments: [
    {
      type:"static",
      content: "Give me 10 apealing available startup names based on the following idea and vision statment and make it appealing too my target audience below. Make sure the domain is not taken and there is no company with the same name \n",
    },
    { type: "variable", content: "validation" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "visionStatment" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "targetAudience" },


  ],
  competitorAnalysis: [
    {
      type:"static",
      content: "Give me 10 apealing available startup names based on the following idea and vision statment and make it appealing too my target audience below. Make sure the domain is not taken and there is no company with the same name \n",
    },
    { type: "variable", content: "validation" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "visionStatment" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "targetAudience" },


  ],
  solution: [
    {
      type:"static",
      content: "Define the soulution statment based on the following Idea, vision and problem statments. \n",
    },
    { type: "variable", content: "validation" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "visionStatment" },
    {
      type:"static",
      content: "\n",
    },
    { type: "variable", content: "problemStatment" },
    { type: "static", 
    content: "A good solution statement will cover what is the best practical and effective way to use the idea to solve the problem. It needs to show exactly how the idea solve each part of the problem and the overall problem"
    },

  ],

};

const isValidPromptMap = (map: PromptMap): boolean => {
  for (let key in map) {
    for (let part of map[key]) {
      if (
        part.type === "variable" &&
        part.content !== "idea" &&
        !(part.content in map)
      ) {
        console.error(`Invalid content "${part.content}" in prompt "${key}"`);
        return false;
      }
    }
  }
  return true;
};

if (!isValidPromptMap(promptMap)) {
  throw new Error("Invalid PromptMap");
}

export default promptMap;
