import { shield } from "graphql-shield";
import { customerPermissions } from "@resolvers/customer";
import { isAuthenticated } from "./permissions";
import { productPermissions } from "@resolvers/product";

export const permissions = shield({
  Query: {
    "*": isAuthenticated,
    ...customerPermissions.quries,
    ...productPermissions.quries,
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