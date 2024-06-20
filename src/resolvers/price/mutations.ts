import { ContextObjectType, ProductPriceEntryArgsType } from "@core/types";

export const resolverMutations = {
  Mutation: {
    productPriceEntry: async (
      _: unknown,
      args: ProductPriceEntryArgsType,
      context: ContextObjectType
    ) => {
      console.log(args);
      return {};
    },
  },
};
