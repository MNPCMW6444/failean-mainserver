import { RedisPubSub } from "graphql-redis-subscriptions";
import { discoverService } from "./AWSDiscovery";

export let pubsub: any;

const connectRedis = async () => {
  const redisIp = await discoverService("us-east-1", {
    NamespaceName: "dev",
    ServiceName: "redis-s",
    MaxResults: 10,
  });

  console.log(`Connecting to Redis at ${redisIp}:6379`);

  pubsub = new RedisPubSub({
    connection: redisIp + ":6379",
  });

  pubsub.getSubscriber().on("connect", () => {
    console.log("Subscriber connected to Redis");
  });

  pubsub.getSubscriber().on("error", (error: any) => {
    //console.error("Subscriber failed to connect to Redis", error);
  });
};

export default connectRedis;
