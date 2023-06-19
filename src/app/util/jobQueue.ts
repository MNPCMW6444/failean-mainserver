import Queue from "bull";
import "../jobs/callOpenAI";

// Create a new Bull queue
const openAIQueue = new Queue("openAIQueue");

// Process jobs using the myJob function
openAIQueue.process(myJob);

export default openAIQueue;
