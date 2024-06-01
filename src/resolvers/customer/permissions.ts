import { allow, and } from "graphql-shield";
import { hasRole, isAuthenticated } from "@permissions/permissions";

export const quriesPermissions = {
  user: and(isAuthenticated, hasRole("usr:r")),
  token: allow,
  refresh: allow,
}

export const mutationPermissions = {
  inviteStaff: and(isAuthenticated, hasRole("usr:c"))
}
