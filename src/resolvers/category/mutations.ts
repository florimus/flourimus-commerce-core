import { CategoryCreateMutationArgsType, ContextObjectType } from "@core/types";
import { createcategory } from "@services/categoryService";

export const resolverMutations = {
  Mutation: {
    categoryCreate: async (
      _: unknown,
      args: CategoryCreateMutationArgsType,
      context: ContextObjectType
    ) => await createcategory(args, context),
  },
};
