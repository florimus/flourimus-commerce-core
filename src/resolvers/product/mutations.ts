import {
  ContextObjectType,
  CreateProductArgsType,
} from "@core/types";
import { createProduct } from "@services/productService";

export const resolverMutations = {
  Mutation: {
    productCreate: async (
      _: unknown,
      args: CreateProductArgsType,
      context: ContextObjectType
    ) => await createProduct(args, context),
  },
};
