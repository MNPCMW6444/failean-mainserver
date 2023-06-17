import { myJobQueue } from "../util/jobQueue";

myJobQueue.process(async (job) => {
  // Do something with job.data
});
