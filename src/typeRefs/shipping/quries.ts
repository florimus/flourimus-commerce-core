import { gql } from "apollo-server-express";

export const ShippingQuries = gql`
  type Query {
    shippingMethod(_id: ID): ShippingMethods
  }
`;
