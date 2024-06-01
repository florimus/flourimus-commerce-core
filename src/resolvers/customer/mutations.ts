import { ContextObjectType, InviteStaffMutationArgsType } from "@core/types";
import { inviteStaffUser } from "@services/customerService";

export const resolverMutations = {
  Mutation: {
    inviteStaff: async (
      _: unknown,
      args: InviteStaffMutationArgsType,
      context: ContextObjectType
    ) => await inviteStaffUser(args, context),
  },
};
