import { hasRole, isAuthenticated } from "@permissions/permissions";
import { and } from "graphql-shield";

export const quriesPermissions = {
  warehouseList: isAuthenticated,
};

export const mutationPermissions = {
  WarehouseCreate: and(isAuthenticated, hasRole("prd:u")),
  WarehouseStatusChange: and(isAuthenticated, hasRole("prd:u")),
};
