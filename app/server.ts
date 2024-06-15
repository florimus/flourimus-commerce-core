import context from "../src/context";
import definition from "./definition";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "src/permissions";

const { ApolloServer } = require("apollo-server-express");

const schema = makeExecutableSchema({
  typeDefs: definition.typeDefs,
  resolvers: definition.resolvers,
});

const schemaWithMiddleware = applyMiddleware(
  schema,
  permissions
);

export const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context: context.userContext,
  introspection: true,
  playground: true, 
});