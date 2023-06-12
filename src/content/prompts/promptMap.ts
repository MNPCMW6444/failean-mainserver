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
        "You are now a Co-Founder and an expireinced entreprenuer. Youre goal is to write a good problem statment. A good problem statement will cover what is the problem, why it's important, and who it impacts (all the different options) add the economic burden of the problem if relevant. A good problem statement should create awareness and stimulate creative thinking. Define the problem statement shorly based on the following Idea Use numbers to support your claims .\n",
    },
    { type: "variable", content: "refinedIdea" },
  ],
  visionStatement: [
    {
      type: "static",
      content:
        "Define the vision statement of my startup in one sentence. It should be clear and apealing and deliver the positive change the idea will have in the world. use the following idea and problem statement to detemine the vision statement. This is an example for a good vision statment: BBC: “To be the most creative organization in the world” Disney: “To make people happy.” Google: “To provide access to the world's information in one click” IKEA: “To create a better everyday life for the'  \n",
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
        "Give me the startup's mission statmmments shortly try to cover: Purpose - This is the reason for the company's existence. It often includes what the company does and for whom. Strategy - This includes how the company approaches its work and how it achieves its objectives. Values - These are the guiding principles and beliefs that are at the heart of the company's culture. Write a short paragraphe and at the end in a new row write one sentence mission statment like Google's mission statement is, 'To organize the world's information and make it universally accessible and useful.'  \n",
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
        "Provide a detailed startup branding strategy. Branding includes 3 things: set of values, tone of voice and visual branding. create a table for each. set of values: value, how is the customer reacting. tone of voice: emotions (what emotions do the brand want to convey). visual branding: logo (give suggestion of style), typography (suggest typographies that are relevant to the tone of voice),next, give a list of 3 brand drivers (things we want the customer to say about our brand). example Apple: set of values - quality, hight society, ect... tone of voice - advanced, knowledgable, ect... visual branding: logo - simple, futuristic ect... typography: ect.... brand drivers: I just love looking at my phone, I feel relaxed when apple is taking care of my data, ect... in the end, consider all of these and create a brand identity prism.\n",
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
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "competitorAnalysis" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "marketAnalysis" },
  ],
  targetAudience: [
    {
      type: "static",
      content:
        "Give me a detailed description of all my potential target audiences based on my startup idea and problem statement. If needed, devide it to 'customers' if they are only paying and 'users' if they only use it. It shuld include the needs, purchase habits, characteristics, problem, and other categories you see as important for this specific idea.\n",
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
        "Give me 10 apealing available startup names based on the idea and vision statement, and make it appealing to my target audience. Make sure the domain is not taken and there is no company with the same name \n",
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
        "You are the CMO of my new startup company. We are preforming a comperhensive market reaserch. you need to answer the question 'Is there a sufficient demand for our product?' based on the following idea, solution and target audience, First, give an estimation to the market size by calculating the total addresable market (TAM) as a multiplication of the estimated number of potential customers * pricing. Then calculate the servicable addresable market (SAM), based on the gtmStrategy. then calculate the servisable obtainable market as 1%/5%/10% of the SAM.\n",
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
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "gtmStrategy"},
    {
      type: "static",
      content: "\n",
    },
  ],
  gtmStrategy: [
    {
      type: "static",
      content:
        "You are a business and marketing expert with more than 30 years of knowledge, and vast experience in different marketing landscapes. Build your go to market strategy based on the solution, target audience and competitor analysis. It should look like actionable steps, example: 1. start advertising in location:x/ platform:y to persona:e for: z amount of time. 2. ect...\n",
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
      content: "Cosider the place where it's most probable I would find my target audience, in terms of geography, platform, ect. criteria depends on the idea.\n",
    },
    { type: "variable", content: "competitorAnalysis" },
    {
      type: "static",
      content: "based on the competitors location, consider wether you decide to compete in the same geography/ demography ect. or not into the strategy \n",
    },
  ],
    risksAndChallanges: [
      {
        type: "static",
        content:
          "You are a Chif Risk Oficer with more than 30 years of knowledge, and vast experience in companies and different situations. Based on the information below, Build your risk management plan with the best practices of risk management like this (parameters are 1-5): the potential impact of a risk, the likelyhood of happening, and final score is multiplication of both. in the end note who is the position in the company responsible for mitigating the risk, all the actions needed to midigate the risk.   \n",
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
      { type: "variable", content: "channels" },
      {
        type: "static",
        content: "\n",
      },
      { type: "variable", content: "marketCap" },
      {
        type: "static",
        content: "\n",
      },
      { type: "variable", content: "revenueProjections" },
      {
        type: "static",
        content: "\n",
      },
      { type: "variable", content: "competitorAnalysis" },
      {
        type: "static",
        content: "\n",
      },
      
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
      content: "You are the CFO of my startup company. Here is some of the relevant information. We are conducting an in-depth financial analysis. Provide as many projected revenue estimates as you can find, including the source you used. Identify your target market: To begin, you need to identify your target market. This would involve determining who needs your service and who would be willing to pay for it. Let's say our target market is small businesses in the United States. use the estimation below for market size: Next, you need use the estimaation below for the size of your target market. for example (replace this with my startupq) Suppose there are approximately 30 million small businesses in the U.S. Calculate the market penetration rate: Your market penetration rate is the percentage of your target market you think you can reach. For a new startup, this rate could be quite small. Let's say we set an ambitious, yet realistic, goal of 0.01% market penetration in our first year. That would equate to 3,000 customers. Determine the average revenue per customer: This is where your pricing strategy comes in. If you are a SaaS business, you might charge a monthly subscription fee. Let's say the fee is $50/month or $600/year. Calculate projected revenue: Multiply your estimated number of customers by your average revenue per customer. So, 3,000 customers spending $600/year gives us an estimated first-year revenue of $1.8 million. Factor in growth: In subsequent years, you would want to factor in growth. This could come from expanding your market penetration, increasing your prices, or upselling/cross-selling to existing customers. Let's say you aim for a 50% year-on-year growth rate for these projections. This gives us a rough projection for the first few years: Year 1: $1.8 million Year 2: $2.7 million ($1.8 million * 150%) Year 3: $4.05 million ($2.7 million * 150%)s.\n",
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
      content: "You are the Chief Sales Officer of our startup company. Use the iformation below to create detailed sales volume estimates, outlining your methodologies and any assumptions made.This is a prediction of the quantity or number of units that a company expects to sell in a specified future period. It's expressed in units and does not consider the price at which those units will be sold. Endeavor to identify the key factors affecting our sales volume and provide KPI's to measure them and a growth rate for each if available. calculate your sales volume by multiplying the market size below by your market share below and your estimated conversion rate. Remember to consider seasonal factors and trends if they apply to your business.\n",
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
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "competitorAnalysis" },
    

  ],
  potentialInvestors: [
    {
      type: "static",
      content:
        "You are an expert all things fundraising and investors. You've been a VC and VD manager, angel investor, hosted countless accelerators and startup hubs. Give me the potential investors by different reasons/categories. Base your decisions on our product roadman, solution, go to market strategy, business model, market analysis and competitor analysis. \n",
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
    { type: "variable", content: "businessModel" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "competitorAnalysis" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "productRoadmap" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "gtmStrategy" },
    {
      type: "static",
      content: "\n",
    },
    { type: "variable", content: "marketAnalysis" },
    {
      type: "static",
      content: "\n",
    },
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
        "You are the CMO of my startup we need to first identify our direct and indirect competitores based on our market and solution I will give you below. then we need to preform a SWOT analysis for each competitor and lastly give a detailed table of the competitores with relevant columes like business model, target audience, basic information, products and services, market share, branding, website traffic and every other relevant detail you find. .  \n",
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
        "You are a product manager at our startup. Detail the features that needs to be developed of the product/service based on the information below. Add a list of epics, tasks and sub tasks for the developent team below. a. \n",
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
        "You are an expireinced product manager in our startup. Please write user stories for the high-level Product Requirement Document (PRD). Each user story should reflect a requirement or need from your target audience, prioritized by RICE score. Use the information provided below and the user persona's provided. The format should be: 'As a [type of user], I want [some goal] so that [some reason].' \n",
    },
    { type: "variable", content: "targetAudience" },
    { type: "static", content: "\n" },
    { type: "variable", content: "problemStatement" },
    { type: "static", content: "\n" },
    { type: "variable", content: "solution" },
    { type: "static", content: "\n" },
    { type: "variable", content: "refinedIdea" },
    { type: "static", content: "\n" },
    { type: "variable", content: "idealCustomerPersona" },


  ],
  productRoadmap: [
    {
      type: "static",
      content:
        "You are an expireinced product manager in our startup. please create a product roadmap with atlassian confluence product roadmap page for our product/service based on your go to market strategy, target audience, problem Statement, solution, and ideal customer persona. \n",
    },
    { type: "variable", content: "targetAudience" },
    { type: "static", content: "\n" },
    { type: "variable", content: "problemStatement" },
    { type: "static", content: "\n" },
    { type: "variable", content: "solution" },
    { type: "static", content: "\n" },
    { type: "variable", content: "refinedIdea" },
    { type: "static", content: "\n" },
    { type: "variable", content: "idealCustomerPersona" },
    { type: "static", content: "\n" },
    { type: "variable", content: "gtmStrategy" },
    { type: "static", content: "\n" },
  ],
  partnerships: [
    {
      type: "static",
      content:
        "You are a chief business development officer with 30 years of experience in the field of partnerships, marketing and personal relations. Please suggest all the potential partnerships we can (based on the solution, business model, market analysis, competitor analysis, product roadmap and go to market strategy) have and categorize them how you see fit.\n",
    },
    { type: "variable", content: "solution" },
    { type: "static", content: "\n" },
    { type: "variable", content: "businessModel" },
    { type: "static", content: "\n" },
    { type: "variable", content: "marketAnalysis" },
    { type: "static", content: "\n" },
    { type: "variable", content: "competitorAnalysis" },
    { type: "static", content: "\n" },
    { type: "variable", content: "productRoadmap" },
    { type: "static", content: "Consnpm runider the roadmap, because in different stages different partners are relevant\n" },
    { type: "variable", content: "gtmStrategy" },
    { type: "static", content: "Consider the go to market strategy, to have partners with strong position in the different stages.\n" },
  ],
  teamComposition: [
    {
      type: "static",
      content:
        "You are an expireinced CEO with endless years of experience in company building. you know all the best practices of department structures in a lot of different business types. Create a the dream team, not more than nesseccary (it's a startup that's just starting), of the individuals most important for for achieving product market fit, based on product roadmap, go to market strategy, solution and competitor analysis.\n",
    },
    { type: "variable", content: "solution" },
    { type: "static", content: "\n" },
    { type: "variable", content: "refinedIdea" },
    { type: "static", content: "\n" },
    { type: "variable", content: "productRoadmap" },
    { type: "static", content: "\n" },
    { type: "variable", content: "gtmStrategy" },
    { type: "static", content: "\n" },
    { type: "variable", content: "competitorAnalysis" },
    { type: "static", content: "\n" },
  ],

  uniqueValueProposition: [
    {
      type: "static",
      content:
        "You are now the Chief Product Officer and chief marketing office of our startup. you have 30 years of experience in the fields. Based on the startup's value proposition and competitive analysis, define our unique value proposition (UVP). The UVP should state what makes our product or service uniquely valuable to customers and differentiates us from the competition. add a list of the UVP in bulletpoints. at the end, add a table of our competitores (listed below) compared to us when measuring their features against our UVP \n",
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
      "As our startup's Chief Marketing Officer, identifying our Ideal Customer Persona (ICP) is critical to our business strategy. You need to focus on the customer type that you believe will receive the most value from our solution.\n\nRemember, not all customers are right for our product, and some could even harm our brand or product development. We need to be selective, even if it means 'losing out' on some potential customers initially. This focus will help keep our positioning, marketing strategy, and product roadmap consistent.\n\nPlease note, if we are a two (or more) sided marketplace, we should define one ICP for each side of the market. Our understanding of the ICP might change as the business evolves. It's a natural process for early-stage startups. We need to learn from our early customers and adapt as needed.\n\nBased on our startup's refined idea and solution, who do you think is our ICP? Please provide a detailed description (persona ID) including demographic information, interests, behavioral patterns, needs, and challenges. Also, discuss how our product fits into their life or work.",
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
slogan: [
  {
    type: "static",
    content:
      "You are a CMO at our startup. Your goal is to create a creative slogan for our company that will  attract new customers and convey the vision statement and branding strategy provided below. A good slogan will be maximum 5 words and will be memorable, includes key benefits, it imports positive feelings about the brand. Here are some examples for good slogans Meow Mix: 'Tastes So Good, Cats Ask for It By Name' The U.S. Marine Corps: 'Semper Fi' Allstate: ‘You’re in Good Hands With Allstate’ Ronseal: 'It Does Exactly What It Says on the Tin.' The Mosaic Company: 'We Help the World Grow the Food It Needs' Pitney Bowes: 'We Power Transactions That Drive Commerce' Target: 'Expect More. Pay Less.'Verizon: '5G Built Right.' Nike: 'Just Do It.' Apple: 'Think Different. Provide a list of 10 potential slogens for our startup. add a short descroption for why this is a good slogen for our startup"
     
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
  { type: "variable", content: "missions" },
  {
    type: "static",
    content: "\n",
  },
  { type: "variable", content: "branding" },
  {
    type: "static",
    content: "\n",
  },
  { type: "variable", content: "solution" },
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
