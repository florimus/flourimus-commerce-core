import { CategoryCreateMutationArgsType, ContextObjectType } from "@core/types";
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
