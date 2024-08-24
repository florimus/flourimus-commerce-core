import sequence from "@core/sequence";
import { CategoryCreateMutationArgsType, ContextObjectType } from "@core/types";
import { getCurrentTime } from "@core/utils/timeUtils";
import categoryRepository from "@repositories/categoryRepository";

/**
 * Controller used to create category
 * @param categoryCreateInput
 * @param context
 * @returns
 */
export const createcategory = async (
  categoryCreateInput: CategoryCreateMutationArgsType["categoryCreateInput"],
  context: ContextObjectType
) => {
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
};
