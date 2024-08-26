import {
  CategoryArgsType,
  CategoryType,
  ContextObjectType,
  ProductListArgsType,
} from "@types";
import {
  fetCategoryProducts,
  getCategoryById,
} from "@services/categoryService";

export const resolverQuries = {
  Query: {
    category: async (
      _: unknown,
      args: CategoryArgsType,
      context: ContextObjectType
    ) => await getCategoryById(args, context),
  },
  Category: {
    productList: async (parent: CategoryType, args: ProductListArgsType) =>
      await fetCategoryProducts(parent, args),
  },
};
