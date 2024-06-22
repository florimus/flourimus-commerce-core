import {
  UserQueryArgsType,
  TokenQueryArgsType,
  RefreshQueryArgsType,
  InviteStaffMutationArgsType,
  ContextObjectType,
  VerifyInvitationQueryArgsType,
  OnboardStaffMutationArgsType,
  ForgotPasswordMutationArgsType,
  ResetPasswordMutationArgsType,
  AddressCreateArgsType,
} from "@types";

import customerServiceImpl from "@services/impl/customerServiceImpl";

/**
 * Controller used to get current user
 * @param args
 * @returns
 */
export const getCurrentUserInfo = async (context: ContextObjectType) => {
  return await customerServiceImpl.getCurrentUserInfo(context);
};

/**
 * Controller used to get user
 * @param args
 * @returns
 */
export const getUserInfo = async (args: UserQueryArgsType) => {
  return await customerServiceImpl.getUserInfo(args);
};

/**
 * Controller used to create access token
 * @param args
 * @returns
 */
export const getToken = async (args: TokenQueryArgsType) => {
  return await customerServiceImpl.getToken(args);
};

/**
 * Controller used to create refresh token
 * @param args
 * @returns
 */
export const getRefreshToken = async (args: RefreshQueryArgsType) => {
  return await customerServiceImpl.getRefreshToken(args);
};

/**
 * Controller used to invite staff
 * @param args
 * @returns
 */
export const inviteStaffUser = async (
  args: InviteStaffMutationArgsType,
  context: ContextObjectType
) => {
  return await customerServiceImpl.inviteStaffUser(args, context);
};

/**
 * Controller used to get verify staff invitation token
 * @param args
 * @returns
 */
export const getVerifiedStaffInfo = async (
  args: VerifyInvitationQueryArgsType
) => {
  return await customerServiceImpl.getVerifiedStaffInfo(args);
};

/**
 * Controller used to get onboard invited ustaff
 * @param args
 * @returns
 */
export const onboardInvitedStaff = async (
  args: OnboardStaffMutationArgsType
) => {
  return await customerServiceImpl.onboardInvitedStaff(args);
};

/**
 * Controller used to get forget password link
 * @param args
 * @returns
 */
export const forgotPassword = async (args: ForgotPasswordMutationArgsType) => {
  return await customerServiceImpl.forgotPassword(args);
};

/**
 * Controller used to get reset password
 * @param args
 * @returns
 */
export const resetPassword = async (args: ResetPasswordMutationArgsType) => {
  return await customerServiceImpl.resetPassword(args);
};

/**
 * Controller used to create customer address
 * @param args
 * @returns
 */
export const createAddress = async (
  args: AddressCreateArgsType,
  context: ContextObjectType
) => {
  return await customerServiceImpl.createAddress(
    args.createAddressInput,
    context
  );
};

/**
 * Controller used to get current user's addresses
 * @param args
 * @returns
 */
export const getCurrentUserAddresses = async (context: ContextObjectType) => {
  return await customerServiceImpl.getCurrentUserAddresses(context);
};
