import { allow } from "graphql-shield";

export const quriesPermissions = {
  product: allow,
}

// export const mutationPermissions = {
//   inviteStaff: and(isAuthenticated, hasRole("usr:c")),
//   onboardStaff: allow,
//   forgotPassword: allow,
//   resetPassword: allow
// }
