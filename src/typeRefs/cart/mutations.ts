import { gql } from "apollo-server-express";

export const CartMutations = gql`
  type Mutation {
    cartCreate: Cart
    cartItemAdd(addToCartInput: AddToCartInput!): Cart
  }
`;
