import { RedisPubSub } from "graphql-redis-subscriptions";

export let pubsub: any;

const connectRedis = async () => {




  pubsub = new RedisPubSub({
    connection:"redis--6b5sfbe.internal.bluebeach-0228d74e.australiaeast.azurecontainerapps.io:6379",
  });

  pubsub.getSubscriber().on("connect", () => {
    console.log("Subscriber connected to Redis");
  });

  pubsub.getSubscriber().on("error", (error: any) => {
    //console.error("Subscriber failed to connect to Redis", error);
  });
};

export default connectRedis;
