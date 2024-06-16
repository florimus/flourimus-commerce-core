import { ProductArgsType, ProductType } from "@core/types";
import { getProductById, getVariantInfo } from "@services/productService";

export const resolverQuries = {
  Query: {
    product: async (_: unknown, args: ProductArgsType) =>
      await getProductById(args),
  },
  Product: {
    variants: async (product: ProductType) => await getVariantInfo(product),
  },
};
