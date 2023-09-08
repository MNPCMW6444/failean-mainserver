import { RedisPubSub } from "graphql-redis-subscriptions";
import * as process from "process";
import  Queue from 'bull';
import Redis from 'ioredis';

const redisConnectionString = process.env.AZURE_REDIS_CONNECTIONSTRING+"";




export const openAIQueue = new Queue('openAIQueue', redisConnectionString);





   const pubsub = new RedisPubSub({
    publisher: new Redis(redisConnectionString),
    subscriber: new Redis(redisConnectionString)
  });



  pubsub.getSubscriber().on("connect", () => {
    console.log("Subscriber connected to Redis");
  });

  pubsub.getSubscriber().on("error", (error: any) => {
    console.error("Subscriber failed to connect to Redis", error);
  });


export default pubsub;
