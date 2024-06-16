import { gql } from "apollo-server-express";

export const ProductQuries = gql`
  type Query {
    product(_id: String!): Product
    productList(productListInput: ProductListInput): ProductList
  }
  type Subscription {
    newMessage: Message
  }
  type Message {
    id: String
    content: String
  }
`;
