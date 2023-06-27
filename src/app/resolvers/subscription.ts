const Subscription = {
  asd: {
    subscribe: (_: any, __: any, context: any) =>
      context.pubsub.asyncIterator(["asd"]),
  },
};

export default Subscription;
