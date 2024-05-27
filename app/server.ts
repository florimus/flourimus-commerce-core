import context from "../src/context";
import definition from "./definition";
import UnAuthorizationError from "../src/core/errors/UnAuthorizationError";

const { ApolloServer } = require("apollo-server-express");

/**
 * GraphQl Server Configs
 */
export const server = new ApolloServer({
  typeDefs: definition.typeDefs,
  resolvers: definition.resolvers,
  context: context.userContext,
  formatError: (error: Error) => {
    if (error instanceof UnAuthorizationError) {
      return {
        code: 401,
        message: error.message
      }
    }
  }
});