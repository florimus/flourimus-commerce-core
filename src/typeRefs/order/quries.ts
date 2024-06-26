import { gql } from "apollo-server-express";

export const OrderQuries = gql`
  type Query {
    cart(_id: String!): Cart
    order(orderId: String!): Order
  }
`;
