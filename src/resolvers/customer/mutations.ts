import { ContextObjectType, InviteStaffMutationArgsType, OnboardStaffMutationArgsType } from "@core/types";
import { inviteStaffUser, onboardInvitedStaff } from "@services/customerService";

export const resolverMutations = {
  Mutation: {
    inviteStaff: async (
      _: unknown,
      args: InviteStaffMutationArgsType,
      context: ContextObjectType
    ) => await inviteStaffUser(args, context),

    onboardStaff: async (
      _: unknown,
      args: OnboardStaffMutationArgsType
    ) => await onboardInvitedStaff(args),
  },
};
