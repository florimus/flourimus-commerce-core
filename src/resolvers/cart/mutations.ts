import {
  ContextObjectType,
  cartAddressArgsType,
  cartItemAddArgsType,
  cartItemRemoveArgsType,
} from "@core/types";
import {
  addAddressToCart,
  addItemToCart,
  createUserCart,
  removeItemFromCart,
} from "@services/cartService";

export const resolverMutations = {
  Mutation: {
    cartCreate: async (_: unknown, __: unknown, context: ContextObjectType) =>
      await createUserCart(context),

    cartItemAdd: async (
      _: unknown,
      args: cartItemAddArgsType,
      context: ContextObjectType
    ) => await addItemToCart(args, context),

    cartItemRemove: async (
      _: unknown,
      args: cartItemRemoveArgsType,
      context: ContextObjectType
    ) => await removeItemFromCart(args, context),

    addcartAddresses: async (
      _: unknown,
      args: cartAddressArgsType,
      context: ContextObjectType
    ) => await addAddressToCart(args, context),
  },
};
