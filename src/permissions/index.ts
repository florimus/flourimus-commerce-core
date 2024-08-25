import { shield } from "graphql-shield";
import { customerPermissions } from "@resolvers/customer";
import { isAuthenticated } from "./permissions";
import { productPermissions } from "@resolvers/product";
import UnAuthorizationError from "@errors/UnAuthorizationError";
import { priceTablePermissions } from "@resolvers/price";
import { warehousePermissions } from "@resolvers/warehouse";
import { orderPermissions } from "@resolvers/order";
import { categoryPermissions } from "@resolvers/category";

export const permissions = shield(
  {
    Query: {
      "*": isAuthenticated,
      ...customerPermissions.quries,
      ...productPermissions.quries,
      ...warehousePermissions.quries,
      ...orderPermissions.quries,
    },
    Mutation: {
      "*": isAuthenticated,
      ...customerPermissions.mutations,
      ...productPermissions.mutations,
      ...priceTablePermissions.mutations,
      ...warehousePermissions.mutations,
      ...orderPermissions.mutations,
      ...categoryPermissions.mutations,
    },
  },
  {
    fallbackError: (errors) => {
      if (!errors) {
        return new UnAuthorizationError("Permission Denied");
      }
      return errors as Error;
    },
  }
);
