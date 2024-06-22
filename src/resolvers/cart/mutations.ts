import { ContextObjectType, cartItemAddArgsType } from "@core/types";
import { addItemToCart, createUserCart } from "@services/cartService";

export const resolverMutations = {
  Mutation: {
    cartCreate: async (_: unknown, __: unknown, context: ContextObjectType) =>
      await createUserCart(context),

    cartItemAdd: async (
      _: unknown,
      args: cartItemAddArgsType,
      context: ContextObjectType
    ) => await addItemToCart(args, context),
  },
};
