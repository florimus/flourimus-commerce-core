import context from "../src/context";
import definition from "./definition";
import UnAuthorizationError from "../src/core/errors/UnAuthorizationError";
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
  formatError: (error: Error) => {
    if (error instanceof UnAuthorizationError) {
      return {
        code: 401,
        message: error.message,
      };
    }
    return error;
  },
});