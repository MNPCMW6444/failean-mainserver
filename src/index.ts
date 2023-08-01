import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { useServer } from "graphql-ws/lib/use/ws";
import { Server } from "ws";
import { apolloServer, schema } from "./graphqlSetup";
import { app, port } from "./expressSetup";
import { discoverService } from "./AWSDiscovery";

dotenv.config();

class App {
  pubsub: RedisPubSub | undefined;

  private async connectRedis() {
    const redisIp = await discoverService("us-east-1", {
      NamespaceName: "dev",
      ServiceName: "redis-s",
      MaxResults: 10,
    });

    console.log(`Connecting to Redis at ${redisIp}:6379`);

    this.pubsub = new RedisPubSub({
      connection: redisIp + ":6379",
    });

    this.pubsub.getSubscriber().on("connect", () => {
      console.log("Subscriber connected to Redis");
    });

    this.pubsub.getSubscriber().on("error", (error) => {
      console.error("Subscriber failed to connect to Redis", error);
    });
  }

  private async connectApolloServer() {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    const httpServer = createServer(app);
    const wsServer = new Server({
      server: httpServer,
      path: "/graphql",
    });

    useServer(
      {
        schema,
        execute,
        subscribe,
        onConnect: () => {
          console.log("Client connected");
        },
        onSubscribe: () => {
          console.log("Received new subscription");
        },
        onOperation: (message: any, params: any, webSocket: any) => {
          return {
            ...params,
            context: { ...params.context, pubsub: this.pubsub },
          };
        },
      },
      wsServer
    );

    httpServer.listen(port, () => {
      console.log(
        `Server is ready at http://localhost:${port}${apolloServer.graphqlPath}`
      );
      console.log(`Subscriptions ready at ws://localhost:${port}/graphql`);
    });
  }

  private async connectMongoose() {
    const mongoIp = await discoverService("us-east-1", {
      NamespaceName: "dev",
      ServiceName: "mongo-s",
      MaxResults: 10,
    });

    const connection = mongoose.createConnection(
      `mongodb://${mongoIp}:27017/main?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );

    connection.on("connected", () => {
      console.log("Connected to safe-mongo");
    });

    connection.on("error", (error) => {
      console.error("Error connecting to safe-mongo:", error.message);
    });
  }

  async setup() {
    try {
      await this.connectRedis();
      await this.connectApolloServer();
      await this.connectMongoose();
    } catch (error) {
      console.error(error);
    }
  }
}

const appInstance = new App();
appInstance.setup();

export default appInstance;
