import { ContextObjectType } from "@core/types";
import { createUserCart } from "@services/cartService";

export const resolverMutations = {
  Mutation: {
    cartCreate: async (_: unknown, __: unknown, context: ContextObjectType) =>
      await createUserCart(context),
  },
};
