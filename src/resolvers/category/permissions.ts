import { and } from "graphql-shield";
import { anyUser, hasRole, isAuthenticated } from "@permissions/permissions";

export const quriesPermissions = {
  category: anyUser,
};

export const mutationPermissions = {
  categoryCreate: and(isAuthenticated, hasRole("usr:c")),
};
