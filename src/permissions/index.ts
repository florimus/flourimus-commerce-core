import { shield } from "graphql-shield";
import { customerPermissions } from "@resolvers/customer";
import { isAuthenticated } from "./permissions";
import { productPermissions } from "@resolvers/product";
import UnAuthorizationError from "@errors/UnAuthorizationError";

export const permissions = shield({
  Query: {
    "*": isAuthenticated,
    ...customerPermissions.quries,
    ...productPermissions.quries,
  },
  Mutation: {
    "*": isAuthenticated,
    ...customerPermissions.mutations,
    ...productPermissions.mutations
  }
},
  {
    fallbackError: (errors) => {
      if (!errors) {
        return new UnAuthorizationError("Permission Denyed");
      }
      return errors as Error;
    }
  }
);