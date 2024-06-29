import { gql } from "apollo-server-express";

export const ShippingMutations = gql`
  type Mutation {
    shippingMethodCreate(
      shippingMethodCreateInput: ShippingMethodCreateInput!
    ): ShippingMethods
  }
`;
