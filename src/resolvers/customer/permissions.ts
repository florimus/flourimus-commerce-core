import { and } from "graphql-shield";
import { hasRole, isAuthenticated } from "@permissions/permissions";

export const permissions = {
  user: and(isAuthenticated, hasRole("USR:RD"))
}
