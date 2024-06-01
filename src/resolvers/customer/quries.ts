import { TokenQueryArgsType, UserQueryArgsType } from "@types";
import { getToken, getUserInfo } from "@services/customerService";

export const resolverQuries = {
  Query: {
    user: async (
      _: unknown,
      args: UserQueryArgsType,
    ) => await getUserInfo(args),

    token: async (
      _: unknown,
      args: TokenQueryArgsType
    ) => await getToken(args),
  },
};
