import { gql } from "apollo-server-express";

export const UserDefs = gql`
  type Phone  {
    dialCode: String!
    number: String!
  }

  type User {
    _id: String!
    firstName: String!
    lastName: String
    email: String!
    phone: Phone
    role: String!
    loginType: String!
    lastOnline: String
    createdAt: String
    updatedAt: String
    isActive: Boolean
    createdBy: String
    updatedBy: String
    metaStatus: String
  }

  type Token {
    access: String!
    refresh: String!
  }

  # =============== Inputs =================
  input TokenRequestInput {
    email: String
    password: String
    grandType: String!
    externalToken: String
  }
`;
