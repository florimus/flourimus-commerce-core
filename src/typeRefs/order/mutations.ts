import { gql } from "apollo-server-express";

export const OrderMutations = gql`
  type Mutation {
    cartCreate: Cart
    cartItemAdd(addToCartInput: AddToCartInput!): Cart
    cartItemRemove(productId: [String]!): Cart
    addcartAddresses(
      shipping: AddressInput
      billing: AddressInput
      isSameAsBilling: Boolean
    ): Cart
    initiatePayment: InitiatePaymentResponse
  }
`;
