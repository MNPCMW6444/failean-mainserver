import dotenv from "dotenv";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { useServer } from "graphql-ws/lib/use/ws";
import { Server } from "ws";
import { apolloServer, schema } from "./graphqlSetup";
import { app, port } from "./expressSetup";
import mongoSetup from "./mongoSetup";
import redisSetup, { pubsub } from "./redisSetup";

dotenv.config();

const connectApolloServer = async () => {
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
          context: { ...params.context, pubsub },
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
};

const setup = async () => {
  try {
    await connectApolloServer();
  } catch (error) {
    console.error(error);
  }
};

mongoSetup().then(() => {
  console.log("mongoSetup successfully completed");
  redisSetup().then(() => {
    console.log("redisSetup successfully completed");
    setup();
  });
});
