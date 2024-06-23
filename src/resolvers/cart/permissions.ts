import { anyUser, isAuthenticated } from "@permissions/permissions";

export const quriesPermissions = {
  viewCart: isAuthenticated,
};

export const mutationPermissions = {
  cartCreate: anyUser,
  cartItemAdd: anyUser,
  cartItemRemove: anyUser,
  addcartAddresses: anyUser,
  initiatePayment: anyUser,
};
