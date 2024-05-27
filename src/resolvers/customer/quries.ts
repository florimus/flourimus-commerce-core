import safeRoute from "@context/permissionContext";
import { ContextObjectType, UserQueryArgsType } from "@types";
import { getUserInfo } from "@services/customerService";

export const resolverQuries = {
  Query: {
    user: async (
      _: unknown,
      args: UserQueryArgsType,
      context: ContextObjectType
    ) => await safeRoute("U.3", context.permissons, getUserInfo, args),
  },
};
