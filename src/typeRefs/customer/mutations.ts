import { gql } from "apollo-server-express";

export const UserMutations = gql`
  type Mutation {
    inviteStaff(inviteStaffInput: InviteStaffInput): User
    onboardStaff(onboardStaffInput: OnboardStaffInput): User
  }
`;
