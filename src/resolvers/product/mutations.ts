import {
  ContextObjectType,
  CreateProductArgsType,
  ProductArgsType,
  UpdateProductArgsType,
} from "@core/types";
import {
  createProduct,
  updateProduct,
  statusUpdateProduct,
} from "@services/productService";

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

    productStatusChange: async (
      _: unknown,
      args: ProductArgsType,
      context: ContextObjectType
    ) => await statusUpdateProduct(args, context),

    uploadFile: async (_: unknown, args: any, context: ContextObjectType) => {
      console.log(args);
      return true;
    },
  },
};
