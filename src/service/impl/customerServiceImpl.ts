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
  VerifyInvitationQueryArgsType,
  OnboardStaffMutationArgsType,
  ForgotPasswordMutationArgsType,
  ResetPasswordMutationArgsType,
  AddressCreateArgsType,
  AddressType,
} from "@types";
import {
  createDeltaToken,
  createUserToken,
  decodeDeltaToken,
} from "@core/utils/jwtUtils";
import userRepository, {
  createUser,
  getUserByIdOrEmail,
  updateUser,
} from "@repositories/userRepository";
import constants from "@core/constants/contants";
import { comparePasswords, hashPassword } from "@core/utils/bycriptUtils";
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
 * Controller used to get current user
 * @param args
 * @returns
 */
const getCurrentUserInfo = async (context: ContextObjectType) => {
  return context;
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
  const loginToken: string = createDeltaToken(
    args?.inviteStaffInput?.email,
    userId
  );

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
    link: `${process.env.STORE_FRONT_URL}/invite/${loginToken}`,
  });
  return savedUser ? user : {};
};

/**
 * Controller used to get verify staff invitation token
 * @param args
 * @returns
 */
const getVerifiedStaffInfo = async (args: VerifyInvitationQueryArgsType) => {
  const tokenData = decodeDeltaToken(args?.token);
  const user = await getUserByIdOrEmail("", tokenData?.email);
  if (!user?.isActive && user?.token === args?.token) {
    return user;
  }
  throw new NotFoundError("User not invited");
};

/**
 * Controller used to get onboard invited ustaff
 * @param args
 * @returns
 */
export const onboardInvitedStaff = async (
  args: OnboardStaffMutationArgsType
) => {
  const { onboardStaffInput } = args || {};
  if (
    !onboardStaffInput?._id ||
    !onboardStaffInput?.loginType ||
    !onboardStaffInput?.firstName ||
    !onboardStaffInput?.password
  ) {
    throw new BadRequestError("Invalid request");
  }
  const user = await getUserByIdOrEmail(onboardStaffInput?._id, "");
  if (!user || user.isActive || user?.token !== onboardStaffInput?.token) {
    throw new NotFoundError("No user invite founds");
  }

  const hashedPassword = await hashPassword(onboardStaffInput.password);

  const userRequest: Partial<UserType> = {
    firstName: onboardStaffInput.firstName,
    lastName: onboardStaffInput.lastName,
    password: hashedPassword,
    token: "",
    isActive: true,
    loginType: onboardStaffInput.loginType,
    updatedAt: getCurrentTime(),
    updatedBy: user?.email,
  };
  const savedUser = await updateUser(onboardStaffInput._id, userRequest);
  sendEmail(user?.email, emailCodes.ONBOARD_DASHBOARD_STAFF, {
    firstName: user?.firstName,
  });
  return savedUser;
};

/**
 * Controller used to get forget password link
 * @param args
 * @returns
 */
export const forgotPassword = async (args: ForgotPasswordMutationArgsType) => {
  const user = await getUserByIdOrEmail("", args.email, true);
  if (!user || !user._id || user.loginType !== "password") {
    throw new NotFoundError("No user invite founds");
  }
  const passwordRestToken: string = createDeltaToken(args.email, user._id);
  await updateUser(user._id, {
    token: passwordRestToken,
  });
  sendEmail(user?.email, emailCodes.USER_FORGOT_PASSWORD, {
    firstName: user?.firstName,
    link: `${process.env.STORE_FRONT_URL}/reset/${passwordRestToken}`,
  });
  return {
    email: user.email,
    send: true,
  };
};

/**
 * Controller used to get reset password
 * @param args
 * @returns
 */
export const resetPassword = async (args: ResetPasswordMutationArgsType) => {
  if (!args?.resetPasswordInput?.token || !args?.resetPasswordInput?.password) {
    throw new BadRequestError("Invalid request");
  }

  const tokenData = decodeDeltaToken(args?.resetPasswordInput?.token);
  const user = await getUserByIdOrEmail("", tokenData?.email);

  if (user?.isActive && user?.token === args?.resetPasswordInput.token) {
    const hashedPassword = await hashPassword(
      args?.resetPasswordInput?.password
    );

    await updateUser(user._id, {
      password: hashedPassword,
      token: "",
      updatedAt: getCurrentTime(),
      updatedBy: user?.email,
    });
    sendEmail(user?.email, emailCodes.USER_RESET_PASSWORD, {
      firstName: user?.firstName,
      link: `${process.env.STORE_FRONT_URL}`,
    });
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      success: true,
    };
  }
  throw new NotFoundError("Password request not found");
};

/**
 * Controller used to create customer address
 * @param args
 * @returns
 */
const createAddress = async (
  createAddressInput: AddressCreateArgsType["createAddressInput"],
  context: ContextObjectType
) => {
  if (context.isAnonymous) {
    throw new BadRequestError("Address cannot save for gust users");
  }
  const address: AddressType = {
    _id: uuidv4(),
    city: createAddressInput?.city,
    country: createAddressInput?.country,
    isDefault: createAddressInput?.isDefault,
    landmark: createAddressInput?.landmark,
    pin: createAddressInput?.pin,
    point: createAddressInput?.point,
    state: createAddressInput?.state,
    street: createAddressInput?.street,
    createdAt: getCurrentTime(),
    updatedAt: getCurrentTime(),
    userId: context._id,
    createdBy: context.email,
    updatedBy: context.email,
    isActive: true,
  };
  return userRepository.createCustomerAddress(address);
};

/**
 * Controller used to get current user's addresses
 * @param args
 * @returns
 */
export const getCurrentUserAddresses = async (context: ContextObjectType) => {
  return (await userRepository.getCustomerAddress(context._id)) ?? [];
};

export default {
  getCurrentUserInfo,
  getUserInfo,
  getToken,
  getRefreshToken,
  inviteStaffUser,
  getVerifiedStaffInfo,
  onboardInvitedStaff,
  forgotPassword,
  resetPassword,
  createAddress,
  getCurrentUserAddresses,
};
