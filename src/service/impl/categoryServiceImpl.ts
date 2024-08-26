import sequence from "@core/sequence";
import {
  CategoryCreateMutationArgsType,
  CategoryType,
  ContextObjectType,
  ProductListArgsType,
} from "@core/types";
import { getCurrentTime } from "@core/utils/timeUtils";
import BadRequestError from "@errors/BadrequestError";
import NotFoundError from "@errors/NotFoundError";
import categoryRepository from "@repositories/categoryRepository";
import productRepository from "@repositories/productRepository";

/**
 * Controller used to get category info
 * @param categoryCreateInput
 * @param context
 * @returns
 */
const getCategoryById = async (id: string, isActive: boolean = false) => {
  if (!id) {
    throw new BadRequestError("Id is mandatory");
  }
  const category = await categoryRepository.findcategoryById(id, isActive);
  if (category?._id) {
    return category;
  }
  throw new NotFoundError("Category not found");
};

/**
 * Controller used to create category
 * @param categoryCreateInput
 * @param context
 * @returns
 */
const createcategory = async (
  categoryCreateInput: CategoryCreateMutationArgsType["categoryCreateInput"],
  context: ContextObjectType
) => {
  const { name, productIds, subCategoryIds, parentId } =
    categoryCreateInput || {};
  if (!name) {
    throw new BadRequestError("Name is mandatory");
  }
  if (!name) {
    throw new BadRequestError("Name is mandatory");
  }
  if (parentId) {
    await getCategoryById(parentId);
  }
  if (subCategoryIds) {
    if (subCategoryIds.includes(parentId)) {
      throw new BadRequestError("Parent category cannot be its sub category");
    }
    const isAllCategoriesExits =
      await categoryRepository.checkAllCategoriesExits(subCategoryIds);
    if (!isAllCategoriesExits) {
      throw new BadRequestError("Subcategories not found");
    }
  }
  if (productIds) {
    // TODO: need to verify product ids
  }
  const categoryId = await sequence.categoryId();
  const category = await categoryRepository.createCategory({
    ...categoryCreateInput,
    _id: categoryId,
    isActive: false,
    createdBy: context?.email,
    createdAt: getCurrentTime(),
    updatedBy: context?.email,
    updatedAt: getCurrentTime(),
  });

  return category;
};

/**
 * Controller used to create category
 * @param id
 * @param listArgs
 * @returns
 */
const fetchCategoryProducts = async (
  category: CategoryType,
  listArgs: ProductListArgsType
) => {
  const page = listArgs?.productListInput?.page ?? 0;
  const size = listArgs?.productListInput?.size ?? 10;
  const productIds = category?.productIds?.slice(
    page * size,
    page * size + size
  );
  const products = await productRepository.findProductsByIds(productIds);
  const totalPages = Math.ceil(category?.productIds?.length / size);
  const pageInfo = {
    isStart: page === 0,
    isEnd: page >= totalPages - 1,
    totalPages,
    totalMatches: category?.productIds?.length,
    currentMatchs: productIds?.length,
  };
  return {
    products,
    pageInfo,
  };
};

export default {
  createcategory,
  getCategoryById,
  fetchCategoryProducts,
};
