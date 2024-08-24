import { ContextObjectType } from "@types";
import { getCurrentUserInfo } from "@services/customerService";

export const resolverQuries = {
  Query: {
    me: async (_: unknown, __: unknown, context: ContextObjectType) =>
      await getCurrentUserInfo(context),
  },
};
