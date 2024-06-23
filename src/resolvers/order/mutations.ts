import {
  ContextObjectType,
  CartAddressArgsType,
  CartItemAddArgsType,
  CartItemRemoveArgsType,
  SubmitOrderArgsType,
} from "@core/types";
import {
  addAddressToCart,
  addItemToCart,
  createUserCart,
  initiateCartPayment,
  removeItemFromCart,
  submitUserOrder,
} from "@services/cartService";

export const resolverMutations = {
  Mutation: {
    cartCreate: async (_: unknown, __: unknown, context: ContextObjectType) =>
      await createUserCart(context),

    cartItemAdd: async (
      _: unknown,
      args: CartItemAddArgsType,
      context: ContextObjectType
    ) => await addItemToCart(args, context),

    cartItemRemove: async (
      _: unknown,
      args: CartItemRemoveArgsType,
      context: ContextObjectType
    ) => await removeItemFromCart(args, context),

    addcartAddresses: async (
      _: unknown,
      args: CartAddressArgsType,
      context: ContextObjectType
    ) => await addAddressToCart(args, context),

    initiatePayment: async (
      _: unknown,
      __: unknown,
      context: ContextObjectType
    ) => await initiateCartPayment(context),

    submitOrder: async (
      _: unknown,
      args: SubmitOrderArgsType,
      context: ContextObjectType
    ) => await submitUserOrder(args, context),
  },
};
