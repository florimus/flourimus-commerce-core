import { gql } from "apollo-server-express";

export const ProductQuries = gql`
  type Query {
    product: Product
  }
`;
