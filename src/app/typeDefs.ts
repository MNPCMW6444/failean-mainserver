import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    "A simple type for getting started!"
    hello: String
  }

  type Mutation {
    saveCritiqAnswers(ideaId: String!, critiqAnswers: String!): User!
  }

  type Asd {
    id: ID!
    status: String!
  }

  type Subscription {
    asd: Asd
  }
`;

export default typeDefs;
