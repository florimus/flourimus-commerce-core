import { hasRole, isAuthenticated } from "@permissions/permissions";
import { and } from "graphql-shield";

export const quriesPermissions = {
  product: isAuthenticated
}

export const mutationPermissions = {
  productCreate: and(isAuthenticated, hasRole("prd:c"))
}