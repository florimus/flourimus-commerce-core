import {
  CategoryCreateMutationArgsType,
  CategoryStatusChangeMutationArgsType,
  categoryUpdateMutationArgsType,
  ContextObjectType,
} from "@core/types";
import {
  categoryDetailsUpdate,
  createcategory,
  updateCategoryStatus,
} from "@services/categoryService";

export const resolverMutations = {
  Mutation: {
    categoryCreate: async (
      _: unknown,
      args: CategoryCreateMutationArgsType,
      context: ContextObjectType
    ) => await createcategory(args, context),

    categoryStatusChange: async (
      _: unknown,
      args: CategoryStatusChangeMutationArgsType,
      context: ContextObjectType
    ) => await updateCategoryStatus(args, context),

    categoryUpdate: async (
      _: unknown,
      args: categoryUpdateMutationArgsType,
      context: ContextObjectType
    ) => await categoryDetailsUpdate(args, context),
  },
};
