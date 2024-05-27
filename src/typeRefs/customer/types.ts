import { gql } from "apollo-server-express";

export const UserDefs = gql`
  type User {
    name: String
  }
`;