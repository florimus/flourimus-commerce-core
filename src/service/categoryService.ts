import {
  CategoryArgsType,
  CategoryCreateMutationArgsType,
  CategoryType,
  ContextObjectType,
  ProductListArgsType,
} from "@core/types";
import categoryServiceImpl from "./impl/categoryServiceImpl";

/**
 * Controller used to create category
 * @param args
 * @param context
 * @returns
 */
export const createcategory = async (
  args: CategoryCreateMutationArgsType,
  context: ContextObjectType
) => {
  return await categoryServiceImpl.createcategory(
    args?.categoryCreateInput,
    context
  );
};

/**
 * Controller used to fetch category info
 * @param args
 * @param context
 * @returns
 */
export const getCategoryById = async (args: CategoryArgsType) => {
  return await categoryServiceImpl.getCategoryById(args?._id);
};

/**
 * Controller used to fetch products of the category
 * @param args
 * @param context
 * @returns
 */
export const fetCategoryProducts = async (
  category: CategoryType,
  args: ProductListArgsType
) => {
  return await categoryServiceImpl.fetchCategoryProducts(category, args);
};
