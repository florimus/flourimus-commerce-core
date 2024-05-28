import { ContextObjectType, UserQueryArgsType } from "@types";

export const getUserInfo = async (
  args: UserQueryArgsType,
  context: ContextObjectType
) => {
  return {
    name: "anu",
  };
};
