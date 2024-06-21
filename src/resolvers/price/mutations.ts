import { ContextObjectType, ProductPriceEntryArgsType } from "@core/types";
import { saveProductPrice } from "@services/priceTableService";

export const resolverMutations = {
  Mutation: {
    productPriceEntry: async (
      _: unknown,
      args: ProductPriceEntryArgsType,
      context: ContextObjectType
    ) => await saveProductPrice(args, context),
  },
};
