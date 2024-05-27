import { gql } from "apollo-server-express";

export const UserQuries = gql`
  type Query {
    user: User
  }
`;
