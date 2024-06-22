import {
  AddressCreateArgsType,
  ContextObjectType,
  ForgotPasswordMutationArgsType,
  InviteStaffMutationArgsType,
  OnboardStaffMutationArgsType,
  ResetPasswordMutationArgsType,
} from "@core/types";
import {
  createAddress,
  forgotPassword,
  inviteStaffUser,
  onboardInvitedStaff,
  resetPassword,
} from "@services/customerService";

export const resolverMutations = {
  Mutation: {
    inviteStaff: async (
      _: unknown,
      args: InviteStaffMutationArgsType,
      context: ContextObjectType
    ) => await inviteStaffUser(args, context),

    onboardStaff: async (_: unknown, args: OnboardStaffMutationArgsType) =>
      await onboardInvitedStaff(args),

    forgotPassword: async (_: unknown, args: ForgotPasswordMutationArgsType) =>
      await forgotPassword(args),

    resetPassword: async (_: unknown, args: ResetPasswordMutationArgsType) =>
      await resetPassword(args),

    addressCreation: async (
      _: unknown,
      args: AddressCreateArgsType,
      context: ContextObjectType
    ) => await createAddress(args, context),
  },
};
