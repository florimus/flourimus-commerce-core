import { hasRole, isAuthenticated } from "@permissions/permissions";
import { and } from "graphql-shield";

export const quriesPermissions = {
  warehouseList: isAuthenticated,
};

export const mutationPermissions = {
  warehouseCreate: and(isAuthenticated, hasRole("prd:u")),
  warehouseStatusChange: and(isAuthenticated, hasRole("prd:u")),
  productStockEntry: and(isAuthenticated, hasRole("prd:u")),
};
