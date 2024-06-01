import BadRequestError from "@errors/BadrequestError";
import NotFoundError from "@errors/NotFoundError";
import UnAuthorizationError from "@errors/UnAuthorizationError";
import { UserQueryArgsType, TokenQueryArgsType, UserType } from "@types";
import { createUserToken } from "@core/utils/jwtUtils";
import { getUserByIdOrEmail } from "@repositories/userRepository";
import constants from "@core/constants/contants";
import { comparePasswords } from "@core/utils/bycriptUtils";
import { v4 as uuidv4 } from "uuid";
import roles from "@core/roles";

const anonymousUser: UserType = {
  _id: uuidv4(),
  email: "",
  firstName: "",
  lastName: "",
  lastOnline: "",
  loginType: "anonymousUser",
  role: roles.CUSTOMER,
  isActive: true,
  phone: {
    dialCode: "",
    number: ""
  }
}

export const getUserInfo = async (args: UserQueryArgsType) => {
  const { _id, email } = args || {};
  if (!_id && !email) {
    throw new BadRequestError("_id or email is required");
  }
  const user = await getUserByIdOrEmail(_id, email);
  if (user && user?._id) {
    return user;
  }
  throw new NotFoundError("No user founds");
};

const isvalidPassword = async (password: string, dbPassword?: string) => {
  return comparePasswords(password, dbPassword!);
};

const authenticatedPasswordUser = async (email?: string, password?: string) => {
  if (!email || !password) {
    throw new BadRequestError("Email and Password are mandatory");
  }
  const user = await getUserByIdOrEmail("", email, true);
  if (!user || !user?._id) {
    throw new NotFoundError("No user founds");
  }
  const isValid = await isvalidPassword(password, user.password);
  if (isValid) {
    return createUserToken(user, constants.tokenConstants.REGISTER_TOKEN);
  }
  throw new UnAuthorizationError("Invalid Password");
};

const authenticateAnonymousUser = async () => {
  return createUserToken(anonymousUser, constants.tokenConstants.ANONYMOUS_TOKEN);
}

export const getToken = async (args: TokenQueryArgsType) => {
  const { tokenRequestInput } = args || {};

  switch (tokenRequestInput.grandType) {
    case "password":
      return await authenticatedPasswordUser(
        tokenRequestInput?.email,
        tokenRequestInput?.password
      );
    case "anonymous":
      return authenticateAnonymousUser();
    default:
      break;
  }

  return {
    access: "",
    refresh: "",
  };
}
