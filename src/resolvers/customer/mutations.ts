import {
  ContextObjectType,
  ForgotPasswordMutationArgsType,
  InviteStaffMutationArgsType,
  OnboardStaffMutationArgsType,
  ResetPasswordMutationArgsType,
} from "@core/types";
import {
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
  },
};
