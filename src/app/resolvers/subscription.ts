import { withFilter } from "graphql-subscriptions";

const Subscription = {
  jobUpdated: {
    subscribe: withFilter(
      (_: any, __: any, context: any) =>
        context.pubsub.asyncIterator(["JOB_UPDATED"]),
      (payload: any, variables: any) => {
        return payload.jobUpdated.id === variables.id;
      }
    ),
  },
};

export default Subscription;
