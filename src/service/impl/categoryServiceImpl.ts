import sequence from "@core/sequence";
import {
  CategoryCreateMutationArgsType,
  CategoryType,
  categoryUpdateMutationArgsType,
  ContextObjectType,
  ProductListArgsType,
} from "@core/types";
import { getCurrentTime } from "@core/utils/timeUtils";
import BadRequestError from "@errors/BadrequestError";
import NotFoundError from "@errors/NotFoundError";
import categoryRepository from "@repositories/categoryRepository";
import productRepository from "@repositories/productRepository";
import { verifyProductIds } from "@services/productService";

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
 * Controller used to update category status
 * @param _id
 * @param context
 * @returns
 */
const updateCategoryStatus = async (
  _id: string,
  context: ContextObjectType
) => {
  if (!_id) {
    throw new BadRequestError("Category id is Mandatory");
  }
  const category = await categoryRepository.findcategoryById(_id);
  if (!category?._id) {
    throw new NotFoundError("Category not found");
  }
  const categoryUpdateBody = {
    isActive: !category.isActive,
    updatedAt: getCurrentTime(),
    updatedBy: context.email,
  } as Partial<CategoryType>;
  const updatedCategory = await categoryRepository.updateCategory(
    _id,
    categoryUpdateBody
  );
  return {
    success: updatedCategory.isActive === !category.isActive,
    status: updatedCategory.isActive,
  };
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
  if (productIds && !(await verifyProductIds(productIds))) {
    throw new NotFoundError("Products not qualified to add");
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

/**
 * Controller used to update the category
 * @param args
 * @param context
 * @returns
 */
const categoryDetailsUpdate = async (
  args: categoryUpdateMutationArgsType,
  context: ContextObjectType
) => {
  const request = args?.categoryUpdateInput;
  if (!request?._id?.trim()) {
    throw new BadRequestError("Category id is mandatory");
  }
  const category = await categoryRepository.findcategoryById(request?._id);
  if (!category?._id) {
    throw new NotFoundError("Category not found");
  }

  const updatedCategory: Partial<CategoryType> = {
    description: request?.description || category?.description,
    medias: request?.medias || category?.medias,
    name: request?.name || category?.name,
    productIds: request?.productIds || category?.productIds,
    parentId: request?.parentId || category?.parentId,
    metaStatus: request?.metaStatus || category?.metaStatus,
    subCategoryIds: request?.subCategoryIds || category?.subCategoryIds,
    updatedAt: getCurrentTime(),
    updatedBy: context?.email,
  };

  // verify product ids
  if (
    updatedCategory?.productIds &&
    !(await verifyProductIds(updatedCategory?.productIds))
  ) {
    throw new NotFoundError("Products not qualified to add");
  }
  // verify parent id
  if (updatedCategory?.parentId) {
    if (updatedCategory?.parentId === category?._id) {
      throw new BadRequestError("Category cannot be its own parent");
    }
    try {
      await getCategoryById(updatedCategory?.parentId);
    } catch (error) {
      throw new NotFoundError(
        `Parent category ${request?.parentId} cannot found`
      );
    }
  }
  // verify subcategory ids
  if (Array.isArray(updatedCategory?.subCategoryIds)) {
    if (updatedCategory?.subCategoryIds?.includes(category?._id)) {
      throw new BadRequestError("category cannot be its own sub category");
    }
    if (
      updatedCategory?.subCategoryIds?.includes(updatedCategory?.parentId || "")
    ) {
      throw new BadRequestError(
        "parent category cannot be its own sub category"
      );
    }
    const isAllCategoriesExits =
      await categoryRepository.checkAllCategoriesExits(request?.subCategoryIds);
    if (!isAllCategoriesExits) {
      throw new BadRequestError("Subcategories not found");
    }
  }
  return await categoryRepository.updateCategory(category._id, updatedCategory);
};

export default {
  createcategory,
  getCategoryById,
  fetchCategoryProducts,
  updateCategoryStatus,
  categoryDetailsUpdate,
};
