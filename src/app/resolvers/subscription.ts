import { x } from "../../index";

const Subscription = {
  jobCompleted: {
    subscribe: async () => {
      console.log("Subscription to JOB_COMPLETED started");
      const pubsub: any = await x();
      return pubsub.asyncIterator("JOB_COMPLETED");
    },
  },
};

export default Subscription;
