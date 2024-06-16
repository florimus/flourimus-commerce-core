import {
  ContextObjectType,
  CreateProductArgsType,
  UpdateProductArgsType,
} from "@core/types";
import { createProduct, updateProduct } from "@services/productService";

export const resolverMutations = {
  Mutation: {
    productCreate: async (
      _: unknown,
      args: CreateProductArgsType,
      context: ContextObjectType
    ) => await createProduct(args, context),

    productUpdate: async (
      _: unknown,
      args: UpdateProductArgsType,
      context: ContextObjectType
    ) => await updateProduct(args, context),
  },
};
