import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./app/typeDefs";
import Query from "./app/resolvers/query";
import Mutation from "./app/resolvers/mutation";
import Subscription from "./app/resolvers/subscription";
import { ApolloServerPluginLandingPageDisabled } from "apollo-server-core";
import { Express } from "express";
import { pubsub } from "./index";

const resolvers = {
  Query,
  Mutation,
  Subscription,
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

interface Context {
  req: Express.Request;
  res: Express.Response;
  pubsub: typeof pubsub;
}

const buildContext = ({
  req,
  res,
}: {
  req: Express.Request;
  res: Express.Response;
}): Context => {
  return { req, res, pubsub };
};

const configureApolloServer = (): ApolloServer => {
  const serverConfig = {
    schema,
    context: buildContext,
  };

  if (process.env.NODE_ENV === "production") {
    return new ApolloServer({
      ...serverConfig,
      plugins: [ApolloServerPluginLandingPageDisabled()],
    });
  }

  return new ApolloServer(serverConfig);
};

export const apolloServer = configureApolloServer();
