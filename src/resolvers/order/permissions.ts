import { anyUser, isAuthenticated } from "@permissions/permissions";

export const quriesPermissions = {
  cart: isAuthenticated,
  order: anyUser,
  orders: anyUser,
};

export const mutationPermissions = {
  cartCreate: anyUser,
  cartItemAdd: anyUser,
  cartItemRemove: anyUser,
  addcartAddresses: anyUser,
  initiatePayment: anyUser,
};
