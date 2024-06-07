import {
  UserQueryArgsType,
  TokenQueryArgsType,
  RefreshQueryArgsType,
  InviteStaffMutationArgsType,
  ContextObjectType,
  VerifyInvitationQueryArgsType,
} from "@types";

import customerServiceImpl from "@services/impl/customerServiceImpl";

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
export const inviteStaffUser = async (args: InviteStaffMutationArgsType, context: ContextObjectType) => {
  return await customerServiceImpl.inviteStaffUser(args, context);
};

/**
 * Controller used to get verify staff invitation token
 * @param args 
 * @returns 
 */
export const getVerifiedStaffInfo = async (args: VerifyInvitationQueryArgsType) => {
  return await customerServiceImpl.getVerifiedStaffInfo(args);
};
