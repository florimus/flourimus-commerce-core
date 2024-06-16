import { ProductArgsType, ProductListArgsType, ProductType } from "@core/types";
import {
  getProductById,
  getVariantInfo,
  getProductList,
} from "@services/productService";

export const resolverQuries = {
  Query: {
    product: async (_: unknown, args: ProductArgsType) =>
      await getProductById(args),

    productList: async (_: unknown, args: ProductListArgsType) => {
      // const message = {
      //   id: "1",
      //   content: "Hello, world!",
      // };
      // pubsub.publish("NEW_MESSAGE", { newMessage: message });
      return await getProductList(args);
    },
  },
  Product: {
    variants: async (product: ProductType) => await getVariantInfo(product),
  },
};
