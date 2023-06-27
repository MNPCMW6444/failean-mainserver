import { withFilter } from "graphql-subscriptions";

const Subscription = {
  JobUpdated: {
    subscribe: withFilter(
      (_: any, __: any, context: any) =>
        context.pubsub.asyncIterator(["JobUpdated"]),
      (payload: any, variables: any) => {
        return payload.JobUpdated.id === variables.id;
      }
    ),
  },
};

export default Subscription;
