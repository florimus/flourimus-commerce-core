import { allow, and } from "graphql-shield";
import { anyUser, hasRole, isAuthenticated } from "@permissions/permissions";

export const quriesPermissions = {
  me: isAuthenticated,
  user: and(isAuthenticated, hasRole("usr:r")),
  token: allow,
  refresh: allow,
  verifyInvitation: allow,
};

export const mutationPermissions = {
  inviteStaff: and(isAuthenticated, hasRole("usr:c")),
  onboardStaff: allow,
  forgotPassword: allow,
  resetPassword: allow,
  addressCreation: anyUser,
};
