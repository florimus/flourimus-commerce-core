import { hasRole, isAuthenticated } from "@permissions/permissions";
import { and } from "graphql-shield";

// export const quriesPermissions = {
//   product: isAuthenticated,
//   productList: isAuthenticated,
// };

export const mutationPermissions = {
  productPriceEntry: and(isAuthenticated, hasRole("prd:u")),
};
