import { RefreshQueryArgsType, TokenQueryArgsType, UserQueryArgsType } from "@types";
import { getToken, getUserInfo, getRefreshToken } from "@services/customerService";

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

    refresh: async (
      _: unknown,
      args: RefreshQueryArgsType
    ) => await getRefreshToken(args),
  },
};
