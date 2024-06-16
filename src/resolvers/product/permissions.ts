import { hasRole, isAuthenticated } from "@permissions/permissions";
import { and } from "graphql-shield";

export const quriesPermissions = {
  product: isAuthenticated,
  productList: isAuthenticated,
};

export const mutationPermissions = {
  productCreate: and(isAuthenticated, hasRole("prd:c")),
  productUpdate: and(isAuthenticated, hasRole("prd:u")),
  productStatusChange: and(isAuthenticated, hasRole("prd:u")),
};
