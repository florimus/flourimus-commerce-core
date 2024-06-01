import { allow, and } from "graphql-shield";
import { hasRole, isAuthenticated } from "@permissions/permissions";

export const permissions = {
  user: and(isAuthenticated, hasRole("usr:r")),
  token: allow,
  refresh: allow
}
