import { PromptMap } from "@failean/shared-types";

const promptMap: PromptMap = {
  refinedIdea: [
    {
      type: "static",
      content:
        "You are now a Co-Founder and an expireinced entreprenuer. Please take this basic idea and make it detailed clear and coherent so that investors will want to invest and everyone will understand it, add examles to help understand the idea.\n",
    },
    { type: "variable", content: "idea" },
  ],
  problemStatement: [
    {
      type: "static",
      content:
        "You are now a Co-Founder and an expireinced entreprenuer. Youre goal is to write a good problem statmrnt. A good problem statement will cover what is the problem, why it's important, and who it impacts (Try giving the number of people/the amount of money lost). A good problem statement should should create awareness and stimulate creative thinking. Define the problem statement shorly based on the following Idea .\n",
    },
    { type: "variable", content: "refinedIdea" },
  ],
  visionStatement: [
    {
      type: "static",
      content:
        "Define the vision statement of my startup in one sentence. It should be clear and apealing and deliver the positive change the idea will have in the world. use this idea and problem statement to detemine the vision statement   \n",
    },
    { type: "variable", content: "refinedIdea" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "problemStatement" },
  ],
  missionStatements: [
    {
      type: "static",
      content:
        "Give me the startup's mission statmmments the idea and vision statement A mission statement can cover: Purpose - This is the reason for the company's existence. It often includes what the company does and for whom. Strategy - This includes how the company approaches its work and how it achieves its objectives. Values - These are the guiding principles and beliefs that are at the heart of the company's culture. For instance, Google's mission statement is, 'To organize the world's information and make it universally accessible and useful.'  \n",
    },
    { type: "variable", content: "refinedIdea" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "visionStatement" },
  ],
  branding: [
    {
      type: "static",
      content:
        "Provide a detailed startup branding strategy. give a list of 3 promises we will make to our customers for example Apple promises customers quality and high social status. It is what our customers expect to get when using our products or servises. Also determine the overall design we should use based on the following idea, missiom statement and target customers. \n",
    },
    { type: "variable", content: "refinedIdea" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "missionStatements" },
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
        "Give me a detailed description of all my potential target audiences based on my startup idea and problem statement. If needed, devide it to 'customers' if they are only paying and 'users' if they only use it. It shuld include he needs, purchase habits, characteristics, and location of the target market \n",
    },
    { type: "variable", content: "refinedIdea" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "problemStatement" },
  ],
  startupName: [
    {
      type: "static",
      content:
        "Give me 10 apealing available startup names based on the following idea and vision statement and make it appealing to my target audience below. Make sure the domain is not taken and there is no company with the same name \n",
    },
    { type: "variable", content: "refinedIdea" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "visionStatement" },
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
    { type: "variable", content: "refinedIdea" },
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
    { type: "variable", content: "refinedIdea" },
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
  operationalCosts: [
    {
      type: "static",
      content:
        "As the COO of our startup company, you are responsible for estimating and managing the operational costs. These costs are essential for running our business smoothly on a day-to-day basis. Consider the following categories and provide a detailed breakdown of the associated costs for each:\n\n",
    },
    {
      type: "static",
      content:
        "1. Office Space: This includes rent or the purchase price of the location, remodeling costs, utilities, and other expenses related to our physical workspace.\n\n",
    },
    {
      type: "static",
      content:
        "2. Equipment and Supplies: These costs cover the purchase or lease of necessary equipment, such as computers, machinery, and tools, as well as office supplies and consumables.\n\n",
    },
    {
      type: "static",
      content:
        "3. Technology and Software: This includes the costs associated with acquiring and maintaining technology infrastructure, software licenses, subscriptions, and IT support.\n\n",
    },
    {
      type: "static",
      content:
        "4. Employee Expenses: These costs involve salaries, benefits, training programs, employee perks, and any other expenses related to our workforce.\n\n",
    },
    {
      type: "static",
      content:
        "5. Marketing and Advertising: These costs encompass digital advertising, content creation, social media management, marketing campaigns, and other promotional activities.\n\n",
    },
    {
      type: "static",
      content:
        "6. Professional Services: This includes fees for legal services, accounting, consulting, and any other professional services required to support our business operations.\n\n",
    },
    {
      type: "static",
      content:
        "7. Travel and Transportation: These costs cover business travel expenses, transportation for employees or goods, and any logistics-related expenses.\n\n",
    },
    {
      type: "static",
      content:
        "8. Maintenance and Repairs: This category includes ongoing maintenance costs for equipment, facilities, vehicles, and any repairs or replacements necessary for smooth operations.\n\n",
    },
    {
      type: "static",
      content:
        "9. Insurance: It's crucial to have insurance coverage to protect our business from various risks. Include costs related to general liability, property insurance, and other relevant policies.\n\n",
    },
    {
      type: "static",
      content:
        "10. Miscellaneous Expenses: These are unexpected or miscellaneous costs that may arise during our day-to-day operations. It's essential to allocate a portion of our budget for such expenses.\n\n",
    },
    {
      type: "static",
      content:
        "Provide a detailed breakdown of costs for each category, considering both initial and ongoing expenses. Additionally, estimate any potential future scale-up costs as our business grows.\n",
    },
    { type: "variable", content: "businessModel" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "refinedIdea" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "solution" },
    {
      type: "static",
      content: "\n",
    },

  ],
  

  channels: [
    {
      type: "static",
      content:
        "You are the CMO of the startup. Based on our startup idea, solution, target audience, and business model, determine the best channels to reach our customers. List all potential marketing and distribution channels, discussing their pros and cons. A score of each channel that’s based on the impact, confidence, and ease of success. After scoring each channel, you will prioritize them from highest to lowest. An descriptin of what it takes to get success in each channel. How much money a(s presentege of marketing budget) and time you will invest in each channel. \n",
    },
    { type: "variable", content: "refinedIdea" },
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
        "You are the CMO of my new startup company. below is my idea, target audience and solution We are preforming a comperhensive market reaserch. Give me all the estimated market caps you can find including the name of the resource you used, add CAGR for each. try to find the market segment most relevant to us \n",
    },
    { type: "variable", content: "refinedIdea" },
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
  revenueProjections: [
    {
      type: "static",
      content: "You are the CFO of my startup company. Here is our revenue model, market size, market growth rate, pricing strategy, sales volume estimation, and competitive landscape. We are conducting an in-depth financial analysis. Provide as many projected revenue estimates as you can find, including the source you used. Try to determine the revenue stream most relevant to us and include the projected growth rate for each if it exists.\n",
    },
    { type: "variable", content: "refinedIdea" },
    { 
      type: "static", content: "\n" 
    },
    { type: "variable", content: "businessModel" },
    {
       type: "static", content: "\n" 
    },
    { type: "variable", content: "marketSize" },
    {
       type: "static", content: "\n" 
    },
    { type: "variable", content: "marketCap" },
    {
       type: "static", content: "\n" 
    },
    { type: "variable", content: "pricing" },
    {
       type: "static", content: "\n" 
    },
    { type: "variable", content: "salesVolumeEstimation" },
    { 
      type: "static", content: "\n" 
    },
    { type: "variable", content: "competitorAnalysis" },
  ],
  salesVolumeEstimation: [
    {
      type: "static",
      content: "You are the Chief Sales Officer of our startup company. With our current business model, pricing strategy, and market size, we are performing a thorough sales forecasting. Please provide as detailed sales volume estimates as possible, outlining your methodologies and any assumptions made. Endeavor to identify the key factors affecting our sales volume and provide KPI's to measure them and a growth rate for each if available.\n",
    },
    { type: "variable", content: "refinedIdea" },
    { 
      type: "static", content: "\n" 
    },
    { type: "variable", content: "businessModel" },
    { 
      type: "static", content: "\n" 
    },
    { type: "variable", content: "pricing" },
    { 
      type: "static", content: "\n" 
    },
    { type: "variable", content: "marketSize" },
    { 
      type: "static", content: "\n" 
    },
    { type: "variable", content: "marketCap" },
    { 
      type: "static", content: "\n" 
    },
    { type: "variable", content: "competitorAnalysis" },
    { 
      type: "static", content: "\n" 
    },
    { type: "variable", content: "salesForecastMethod" },
  ],
  salesForecastMethod: [
    {
      type: "static",
      content: "You are the Chief Sales Officer of our startup company. Your task now is to explain the methodology you'll use for forecasting our sales volume. This might include historical sales data, predictive analytics, demand analysis, or any other pertinent techniques. Please provide a detailed description of your selected method, its strengths, potential limitations, and the assumptions made in the process. Remember, the goal is to maximize the accuracy of our sales volume estimation.\n",
    },
    { type: "variable", content: "businessModel" },
    { 
      type: "static", content: "\n" 
    },
    { type: "variable", content: "pricing" },
    { 
      type: "static", content: "\n" 
    },
    { type: "variable", content: "marketSize" },
    { 
      type: "static", content: "\n" 
    },
    { type: "variable", content: "marketCap" },
    { 
      type: "static", content: "\n" 
    },
    { type: "variable", content: "competitorAnalysis" },

  ],


  businessModel: [
    {
      type: "static",
      content:
        "You are now the CEO & CBDO of my new startup company. We want to grow as fast as possible so we can be profitable at the near future.  You need to decide on a business model(B2B/B2C/B2B2C/B2M/B2G) and potential revenue streams for our startup. Here is our startup idea, solution and target audiance. for each relevant option give the pros and cons.   \n",
    },
    { type: "variable", content: "refinedIdea" },
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
    { type: "variable", content: "refinedIdea" },
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
    { type: "variable", content: "refinedIdea" },
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
    { type: "variable", content: "refinedIdea" },
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
        "Define the soulution statement based on the following Idea, vision and problem statements. \n",
    },
    { type: "variable", content: "refinedIdea" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "visionStatement" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "problemStatement" },
    {
      type: "static",
      content:
        "A good solution statement will cover what is the best practical and effective way to use the idea to solve the problem. It needs to show exactly how the idea solve each part of the problem and the overall problem",
    },
  ],
  features: [
    {
      type: "static",
      content:
        "Detail the key features of the product/service based on the problem statement, solution, and user stories. Each feature should include its functionality, the user benefit, and how it aligns with the overall vision and mission of the startup. \n",
    },
    { type: "variable", content: "refinedIdea" },
    { type: "static", content: "\n" },
    { type: "variable", content: "solution" },
    { type: "static", content: "\n" },
    { type: "variable", content: "highLevelPRD" },
  ],
  devDependencies: [
    {
      type: "static",
      content:
        "Identify and detail all the dependencies for the development and operation of your startup's product/service. This should include technical dependencies, third-party services, regulatory or legal dependencies, and any other factors that could impact the development or deployment of your solution. \n",
    },
    { type: "variable", content: "refinedIdea" },
    { type: "static", content: "\n" },
    { type: "variable", content: "solution" },
    { type: "static", content: "\n" },
    { type: "variable", content: "features" },
    { type: "static", content: "\n" },
    { type: "variable", content: "highLevelPRD" },
  ],
  milestones: [
    {
      type: "static",
      content:
        "Define key milestones for the development and deployment of your startup's product/service. Milestones should be specific, measurable, attainable, relevant, and time-bound (SMART). They should align with the overall business objectives and be based on the dependencies and features identified. \n",
    },
    { type: "variable", content: "refinedIdea" },
    { type: "static", content: "\n" },
    { type: "variable", content: "solution" },
    { type: "static", content: "\n" },
    { type: "variable", content: "devDependencies" },
    { type: "static", content: "\n" },
    { type: "variable", content: "features" },
  ],

  valueProposition: [
    {
      type: "static",
      content:
        "You are now the Chief Product Officer of our startup. Based on the startup's idea, solution, and target audience, articulate the value proposition. The value proposition should clearly articulate why a customer should buy our product or service. What are the attractive benefits? What problems are we solving? How are we better than alternatives? \n",
    },
    { type: "variable", content: "refinedIdea" },
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
  highLevelPRD: [
    {
      type: "static",
      content:
        "Please write user stories for the high-level Product Requirement Document (PRD). Each user story should reflect a requirement or need from your target audience, prioritized by importance. The format should be: 'As a [type of user], I want [some goal] so that [some reason].' \n",
    },
    { type: "variable", content: "targetAudience" },
    { type: "static", content: "\n" },
    { type: "variable", content: "problemStatement" },
    { type: "static", content: "\n" },
    { type: "variable", content: "solution" },
    { type: "static", content: "\n" },
    { type: "variable", content: "refinedIdea" },
  ],

  uniqueValueProposition: [
    {
      type: "static",
      content:
        "You are now the Chief Product Officer of our startup. Based on the startup's value proposition and competitive analysis, articulate the unique value proposition (UVP). The UVP should state what makes our product or service uniquely valuable to customers and differentiates us from the competition. \n",
    },
    { type: "variable", content: "refinedIdea" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "valueProposition" },
    {
      type: "static",
      content: "\n",
    },

    { type: "variable", content: "competitorAnalysis" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "targetAudience" },
  ],
  devCosts: [
    {
      type: "static",
      content:
        "Now that we have outlined the solution, features, dependencies, milestones, and value propositions, it's time to estimate the development costs. This includes not just the monetary costs, but also the time and resources necessary for each aspect of the product development. Provide 3 optional Dev team cost (High,Medium,Low budget) include team salaries and add insights on how to reduce costs.  \n",
    },
    { type: "variable", content: "solution" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "features" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "devDependencies" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "milestones" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "valueProposition" },
    {
      type: "static",
      content:
        "Try to break down each aspect into its constituent parts and estimate the costs for each. This could include costs for design, programming, quality assurance, project management, and any other relevant categories. Remember to also factor in the potential costs of any dependencies.",
    },
  ],
  marketingCost: [
    {
      type: "static",
      content:
        "As the Chief Marketing Officer of our startup, it's your responsibility to create a detailed estimate of our marketing costs. This should take into account our startup's refined idea, solution, target audience, and selected marketing channels. Your budget estimation should cover the following areas: \n\n1. Digital Ads: This includes costs for platforms like Google AdWords or Facebook Ads where each click costs between $1-$2. Depending on our target reach, these costs could add up. \n\n2. Discounts and Promotions: Factor in the costs of any promotional discounts we offer to customers. \n\n3. Tech Support: This involves costs for tools to support campaigns, like social media management tools, email campaign design templates, and access to press release platforms like PRWeb. \n\n4. Content Marketing: This includes costs for creating, publishing, and sharing valuable content to attract and convert prospects into customers. \n\n5. Sales Collateral: This includes costs for assets used to support the sales team. These might be related to design, print, and digital distribution. \n\n6. Events: This includes costs for participating in trade shows or promotional events. Consider the expenses for booth space, promotional items, and travel costs. \n\n7. PR Efforts: This covers the costs related to public relations efforts, which can be substantial if we decide to hire a PR firm or a dedicated PR staff member.\n\nRemember, budgeting is an iterative process. As our startup grows and evolves, so too will our marketing needs and expenses. Add the human costs and salaries \n",
    },
    {
       type: "variable", content: "refinedIdea" },
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
    { type: "variable", content: "channels" },
],
idealCustomerPersona: [
  {
    type: "static",
    content:
      "As our startup's Chief Marketing Officer, identifying our Ideal Customer Persona (ICP) is critical to our business strategy. You need to focus on the customer type that you believe will receive the most value from our solution.\n\nRemember, not all customers are right for our product, and some could even harm our brand or product development. We need to be selective, even if it means 'losing out' on some potential customers initially. This focus will help keep our positioning, marketing strategy, and product roadmap consistent.\n\nPlease note, if we are a two (or more) sided marketplace, we should define one ICP for each side of the market. Our understanding of the ICP might change as the business evolves. It's a natural process for early-stage startups. We need to learn from our early customers and adapt as needed.\n\nBased on our startup's refined idea and solution, who do you think is our ICP? Please provide a detailed description including demographic information, interests, behavioral patterns, needs, and challenges. Also, discuss how our product fits into their life or work.",
  },
  { type: "variable", content: "refinedIdea" },
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
