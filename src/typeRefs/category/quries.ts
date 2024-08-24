import { gql } from "apollo-server-express";

export const CategoryQuries = gql`
  type Query {
    category(_id: ID!): Category
  }
`;
