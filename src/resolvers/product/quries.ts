import { ContextObjectType } from "@core/types";

export const resolverQuries = {
  Query: {
    product: async (
      _: unknown,
      __: unknown,
      context: ContextObjectType,
    ) => ({}),
  },
};
