const Subscription = {
  userCreated: {
    subscribe: (_: any, __: any, { pubsub }: any) =>
      pubsub.asyncIterator(["USER_CREATED"]),
  },
};

export default Subscription;
