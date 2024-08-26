import {
  CategoryArgsType,
  CategoryType,
  ProductListArgsType,
} from "@types";
import {
  fetCategoryProducts,
  getCategoryById,
} from "@services/categoryService";

export const resolverQuries = {
  Query: {
    category: async (_: unknown, args: CategoryArgsType) =>
      await getCategoryById(args),
  },
  Category: {
    productList: async (parent: CategoryType, args: ProductListArgsType) =>
      await fetCategoryProducts(parent, args),
  },
};
