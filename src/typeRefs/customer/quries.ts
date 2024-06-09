import { gql } from "apollo-server-express";

export const UserQuries = gql`
  type Query {
    me: User
    user(_id: ID, email: String): User
    verifyInvitation(token: String): User
    token(tokenRequestInput:TokenRequestInput): Token
    refresh(token: String): Token
  }
`;
