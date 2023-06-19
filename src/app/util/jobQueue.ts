import Queue from "bull";
import myJob from "../jobs/myJob";

// Create a new Bull queue
const myQueue = new Queue("myQueue");

// Process jobs using the myJob function
myQueue.process(myJob);

export default myQueue;
