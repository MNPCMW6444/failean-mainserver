import { pubsub } from "../../index";

const Subscription = {
  jobCompleted: {
    subscribe: () => pubsub.asyncIterator("JOB_COMPLETED"),
  },
  jobCompleted2: {
    subscribe: () => pubsub.asyncIterator("JOB_COMPLETED"),
  },
};

export default Subscription;
