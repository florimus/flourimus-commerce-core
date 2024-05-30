import BadRequestError from "@errors/BadrequestError";
import NotFoundError from "@errors/NotFoundError";
import { UserQueryArgsType } from "@types";
import { getUserByIdOrEmail } from "src/repository/userRepository";

export const getUserInfo = async (
  args: UserQueryArgsType,
) => {
  const { _id, email } = args || {}

  if (!_id && !email) {
    throw new BadRequestError("_id or email is required")
  }

  const user = await getUserByIdOrEmail(_id, email);

  if (user && user?._id) {
    return user
  }

  throw new NotFoundError("No user founds")
};
