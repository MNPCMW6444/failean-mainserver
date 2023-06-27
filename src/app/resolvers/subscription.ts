import { withFilter } from "graphql-subscriptions";

const Subscription = {
  asd: {
    subscribe: withFilter(
      (_: any, __: any, context: any) => {
        console.log("PubSub instance: ", context.pubsub);
        const iterator = context.pubsub.asyncIterator(["asd"]);
        console.log("AsyncIterator: ", iterator);
        return iterator;
      },
      (payload: any, variables: any) => {
        console.log("Payload: ", payload);
        console.log("Variables: ", variables);
        return payload.asd.id === variables.id;
      }
    ),
  },
};

export default Subscription;
