import UnAuthorizationError from "@errors/UnAuthorizationError";
import { shield } from "graphql-shield";
import { customerPermissions } from "@resolvers/customer";
import { isAuthenticated } from "./permissions";

export const permissions = shield({
  Query: {
    "*": isAuthenticated,
    ...customerPermissions.quries
  },
  Mutation: {
    "*": isAuthenticated,
    ...customerPermissions.mutations
  }
},
  {
    fallbackError: (errors) => {
      return errors as Error;
    }
  }
);