import UnAuthorizationError from "@errors/UnAuthorizationError";
import { shield } from "graphql-shield";
import { customerPermissions } from "@resolvers/customer";
import { isAuthenticated } from "./permissions";

export const permissions = shield({
  Query: {
    "*": isAuthenticated,
    ...customerPermissions
  },
},
  {
    fallbackError: new UnAuthorizationError("Permission Denied")
  }
);