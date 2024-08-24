import { allow, and } from "graphql-shield";
import { anyUser, hasRole, isAuthenticated } from "@permissions/permissions";

export const quriesPermissions = {
  me: anyUser,
  user: and(isAuthenticated, hasRole("usr:r")),
  token: allow,
  refresh: allow,
  verifyInvitation: allow,
  address: anyUser,
};

export const mutationPermissions = {
  categoryCreate: and(isAuthenticated, hasRole("usr:c")),
};
