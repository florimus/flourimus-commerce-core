import { anyUser } from "@permissions/permissions";

// export const quriesPermissions = {
//   warehouse: isAuthenticated,
//   warehouseList: isAuthenticated,
// };

export const mutationPermissions = {
  cartCreate: anyUser,
};
