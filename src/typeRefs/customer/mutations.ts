import { gql } from "apollo-server-express";

export const UserMutations = gql`
  type Mutation {
    inviteStaff(inviteStaffInput: InviteStaffInput): User
    onboardStaff(onboardStaffInput: OnboardStaffInput): User
    forgotPassword(email: String): ForgotPassword
    resetPassword(resetPasswordInput: ResetPasswordInput): ResetPassword
    addressCreation(createAddressInput: AddressInput!): Address
    addressSetDefault(_id: ID!): Address
    addressUpdate(_id: ID!, updateAdressInput: AddressInput!): Address
  }
`;
