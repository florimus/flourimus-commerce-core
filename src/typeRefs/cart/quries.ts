import { gql } from "apollo-server-express";

export const CartQuries = gql`
  type Query {
    cart(_id: String!): Cart
  }
`;
