import {
  AddressCreateArgsType,
  AddressQueryArgsType,
  AddressUpdateArgsType,
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
  setDefaultAddress,
  updateAddress,
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

    addressSetDefault: async (
      _: unknown,
      args: AddressQueryArgsType,
      context: ContextObjectType
    ) => await setDefaultAddress(args, context),

    addressUpdate: async (
      _: unknown,
      args: AddressUpdateArgsType,
      context: ContextObjectType
    ) => await updateAddress(args, context),
  },
};
