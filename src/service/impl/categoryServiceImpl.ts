import sequence from "@core/sequence";
import { CategoryCreateMutationArgsType, ContextObjectType } from "@core/types";
import { getCurrentTime } from "@core/utils/timeUtils";
import BadRequestError from "@errors/BadrequestError";
import NotFoundError from "@errors/NotFoundError";
import categoryRepository from "@repositories/categoryRepository";

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

export default {
  createcategory,
  getCategoryById,
};
