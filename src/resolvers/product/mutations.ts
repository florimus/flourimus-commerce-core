import {
  ContextObjectType,
  CreateProductArgsType,
  ProductArgsType,
  ProductBulkUploadArgs,
  UpdateProductArgsType,
} from "@core/types";
import {
  createProduct,
  updateProduct,
  statusUpdateProduct,
  bulkUploadProduct,
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

    productBulkUpload: async (
      _: unknown,
      args: ProductBulkUploadArgs,
      context: ContextObjectType
    ) => await bulkUploadProduct(args, context),
  },
};
