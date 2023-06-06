const promptMap: PromptMap = {
  validation: [
    {
      type: "static",
      content:
        "You are now a Co-Founder and an expireinced entreprenuer. Please take this basic idea and make it clear and coherent so that investors will want to invest and everyone will understand it, add examles to help understand the idea for example 'It's like Amazon for cannabis' .\n",
    },
    { type: "variable", content: "idea" },
  ],
  problemStatment: [
    {
      type: "static",
      content:
        "You are now a Co-Founder and an expireinced entreprenuer. Youre goal is to write a good problem statmrnt. A good problem statement will cover what is the problem, why it's important, and who it impacts (Try giving the number of people/the amount of money lost). A good problem statement should should create awareness and stimulate creative thinking. Define the problem statment shorly based on the following Idea .\n",
    },
    { type: "variable", content: "validation" },
  ],
  visionStatment: [
    {
      type: "static",
      content:
        "Define the vision statment of my startup in one sentence. It should be clear and apealing and deliver the positive change the idea will have in the world. use this idea and problem statment to detemine the vision statment   \n",
    },
    { type: "variable", content: "validation" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "problemStatment" },
  ],
  missionStatments: [
    {
      type: "static",
      content:
        "Give me the startup's mission statmmments in an exacutive summery format based on my idea and vision statment \n",
    },
    { type: "variable", content: "validation" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "visionStatment" },
  ],
  branding: [
    {
      type: "static",
      content:
        "Provide a detailed startup branding strategy. give a list of 3 promises we will make to our customers for example Apple promises customers quality and high social status. It is what our customers expect to get when using our products or servises. Also determine the overall design we should use based on the following idea, missiom statment and target customers. \n",
    },
    { type: "variable", content: "validation" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "missionStatments" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "targetAudience" },
  ],
  targetAudience: [
    {
      type: "static",
      content:
        "Give me a detailed description of all my potential target audiences based on my startup idea and problem statment. If needed, devide it to 'customers' if they are only paying and 'users' if they only use it. It shuld include he needs, purchase habits, characteristics, and location of the target market \n",
    },
    { type: "variable", content: "validation" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "problemStatment" },
  ],
  startupName: [
    {
      type: "static",
      content:
        "Give me 10 apealing available startup names based on the following idea and vision statment and make it appealing to my target audience below. Make sure the domain is not taken and there is no company with the same name \n",
    },
    { type: "variable", content: "validation" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "visionStatment" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "targetAudience" },
  ],
  marketSize: [
    {
      type: "static",
      content:
        "You are the CMO of my new startup company. We are preforming a comperhensive market reaserch. you need to answer the question 'Is there a sufficient demand for our product?' based on the following idea, solution and target audience, First, give an estimation to the market size by calculating the total addresable market (TAM) as a multiplication of the estimated number of potential customers * the price of our service. Then calculate the servicable addresable market consider geographical and regulatory/legal parameters. then calculate the servisable obtainable market as 1%/5%/10% of the SAM.   \n",
    },
    { type: "variable", content: "validation" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "solution" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "targetAudience" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "pricing" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "businessModel" },
  ],
  pricing: [
    {
      type: "static",
      content:
        "As the Chief Financial Officer of our startup, it's your responsibility to devise a suitable pricing strategy. This decision must be based on our startup's idea, solution, and target audience. Consider factors like production and operational costs, competitor pricing, the perceived value of our product/service, and our business objectives. Do we aim for penetration pricing, price skimming, cost-based pricing, value-based pricing, or a different strategy altogether? Discuss the pros and cons of each potential strategy for our specific case.\n",
    },
    { type: "variable", content: "validation" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "solution" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "targetAudience" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "competitorAnalysis" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "competitorAnalysis" },
  ],

  channels: [
    {
      type: "static",
      content:
        "You are the CMO of the startup. Based on our startup idea, solution, target audience, and business model, determine the best channels to reach our customers. List all potential marketing and distribution channels, discussing their pros and cons. \n",
    },
    { type: "variable", content: "validation" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "solution" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "targetAudience" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "businessModel" },
  ],

  marketCap: [
    {
      type: "static",
      content:
        "You are the CMO of my new startup company. below is my idea, target audience and solution We are preforming a comperhensive market reaserch. Give me all the estimated market caps you can find including the name of the resource you used, add CAGR for each if it exist. try to find the market segment most relevant to us \n",
    },
    { type: "variable", content: "validation" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "solution" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "targetAudience" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "businessModel" },
  ],
  businessModel: [
    {
      type: "static",
      content:
        "You are now the CEO & CBDO of my new startup company. We want to grow as fast as possible so we can be profitable at the near future.  You need to decide on a business model(B2B/B2C/B2B2C/B2M/B2G) and potential revenue streams for our startup. Here is our startup idea, solution and target audiance. for each relevant option give the pros and cons.   \n",
    },
    { type: "variable", content: "validation" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "solution" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "targetAudience" },
  ],

  fundingStrategies: [
    {
      type: "static",
      content:
        "You are the CFO of the startup. Based on our startup idea, business model, and market analysis, propose the most suitable funding strategies for our startup. This should include potential investors, grants, loans, and crowdfunding platforms. Discuss the pros and cons of each strategy. \n",
    },
    { type: "variable", content: "validation" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "businessModel" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "marketAnalysis" },
  ],

  marketAnalysis: [
    {
      type: "static",
      content:
        "You are the Market Research Analyst for our startup. We need a detailed market analysis to make informed business decisions. Based on our startup idea, solution, and target audience, provide a comprehensive analysis of the market. This should include an analysis of market trends, customer needs, a demographic profile of our target market, an examination of our competitors, and any other factors that could affect our market. Also, make sure to identify any opportunities and threats in the market. \n",
    },
    { type: "variable", content: "validation" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "solution" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "targetAudience" },
  ],

  competitorAnalysis: [
    {
      type: "static",
      content:
        "You are the Product Manager of my startup we need to first identify our direct and indirect competitores based on our market and solution I will give you below. then we need to preform a SWOT analysis for each competitor and lastly give a detailed table of the competitores with relevant columes like business model, target audience, basic information, products and services, market share, branding, website traffic and every other relevant detail you find. .  \n",
    },
    { type: "variable", content: "validation" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "solution" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "targetAudience" },
  ],
  solution: [
    {
      type: "static",
      content:
        "Define the soulution statment based on the following Idea, vision and problem statments. \n",
    },
    { type: "variable", content: "validation" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "visionStatment" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "problemStatment" },
    {
      type: "static",
      content:
        "A good solution statement will cover what is the best practical and effective way to use the idea to solve the problem. It needs to show exactly how the idea solve each part of the problem and the overall problem",
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
        console.log(`Invalid content "${part.content}" in prompt "${key}"`);
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
