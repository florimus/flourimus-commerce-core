import { ProductArgsType } from "@core/types";
import { getProductById } from "@services/productService";

export const resolverQuries = {
  Query: {
    product: async (
      _: unknown,
      args: ProductArgsType,
    ) => await getProductById(args),
  },
};
