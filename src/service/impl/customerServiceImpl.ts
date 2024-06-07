import BadRequestError from "@errors/BadrequestError";
import NotFoundError from "@errors/NotFoundError";
import UnAuthorizationError from "@errors/UnAuthorizationError";
import {
  UserQueryArgsType,
  TokenQueryArgsType,
  UserType,
  RefreshQueryArgsType,
  InviteStaffMutationArgsType,
  ContextObjectType,
} from "@types";
import { createDeltaToken, createUserToken } from "@core/utils/jwtUtils";
import { createUser, getUserByIdOrEmail } from "@repositories/userRepository";
import constants from "@core/constants/contants";
import { comparePasswords } from "@core/utils/bycriptUtils";
import { v4 as uuidv4 } from "uuid";
import roles from "@core/roles";
import { verifyRefreshToken } from "@services/authenticationService";
import AlreadyExistsError from "@errors/AlreadyExitsError";
import sequence from "@core/sequence";
import { getCurrentTime } from "@core/utils/timeUtils";
import { emailCodes, sendEmail } from "@services/emailService";
import { validateEmail } from "@core/utils/stringUtils";

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
    number: "",
  },
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
  return createUserToken(
    anonymousUser,
    constants.tokenConstants.ANONYMOUS_TOKEN
  );
};

/**
 * Controller used to get user
 * @param args
 * @returns
 */
const getUserInfo = async (args: UserQueryArgsType) => {
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

/**
 *
 * @param args Controller used to create access token
 * @returns
 */
const getToken = async (args: TokenQueryArgsType) => {
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
  throw new UnAuthorizationError("Invalid Credintials");
};

/**
 * Controller used to create refresh token
 * @param args
 * @returns
 */
const getRefreshToken = async (args: RefreshQueryArgsType) => {
  if (!args.token) {
    throw new BadRequestError("Refresh token Required");
  }
  const payload = verifyRefreshToken(args.token);
  if (payload) {
    if (payload.type === "anonymous-refresh") {
      const user = {
        ...anonymousUser,
        _id: payload._id!,
      };
      return createUserToken(user, constants.tokenConstants.ANONYMOUS_TOKEN);
    }

    const user = await getUserByIdOrEmail(payload._id!, "", true);
    if (!user || !user?._id) {
      throw new NotFoundError("No user founds");
    }
    return createUserToken(user, constants.tokenConstants.REGISTER_TOKEN);
  }
  throw new UnAuthorizationError("Invalid Token");
};

/**
 * Controller used to invite staff
 * @param args
 * @returns
 */
const inviteStaffUser = async (
  args: InviteStaffMutationArgsType,
  context: ContextObjectType
) => {
  const existingUser = await getUserByIdOrEmail(
    "",
    args.inviteStaffInput.email
  );
  if (existingUser?._id) {
    throw new AlreadyExistsError("user already exists");
  }

  if (!validateEmail(args?.inviteStaffInput?.email)) {
    throw new BadRequestError("invalid email id");
  }

  const userId = await sequence.customerId();
  const loginToken: string = createDeltaToken(args?.inviteStaffInput?.email, userId)

  const user: UserType = {
    _id: userId,
    email: args?.inviteStaffInput.email,
    firstName: args?.inviteStaffInput.firstName,
    lastName: args?.inviteStaffInput.lastName,
    role: args?.inviteStaffInput.role,
    isActive: false,
    token: loginToken,
    createdBy: context.email,
    updatedBy: context.email,
    createdAt: getCurrentTime(),
    updatedAt: getCurrentTime(),
  };

  const savedUser = await createUser(user);
  sendEmail(user?.email, emailCodes.INVITE_DASHBOARD_STAFF, {
    firstName: user?.firstName,
    name: context.firstName,
    role: context.role,
    link: `${process.env.STORE_FRONT_URL}/invite/${user?._id}/token/${loginToken}`
  });
  return savedUser ? user : {};
};

export default {
  getUserInfo,
  getToken,
  getRefreshToken,
  inviteStaffUser,
};
