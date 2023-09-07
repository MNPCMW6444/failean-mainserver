import { RedisPubSub } from "graphql-redis-subscriptions";
import * as process from "process";

export let pubsub: any;

const connectRedis = async () => {




  pubsub = new RedisPubSub({
    connection:process.env.AZURE_REDIS_CONNECTIONSTRING,
  });

  pubsub.getSubscriber().on("connect", () => {
    console.log("Subscriber connected to Redis");
  });

  pubsub.getSubscriber().on("error", (error: any) => {
    //console.error("Subscriber failed to connect to Redis", error);
  });
};

export default connectRedis;
