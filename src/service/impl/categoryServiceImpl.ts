import { CategoryCreateMutationArgsType, ContextObjectType } from "@core/types";

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
  console.log(categoryCreateInput);
  return await {};
};

export default {
  createcategory,
};
