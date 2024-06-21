import { gql } from "apollo-server-express";

export const PriceTableMutations = gql`
  type Mutation {
    productPriceEntry(
      productPriceEntryInput: ProductPriceEntryInput!
    ): ProductPrice
  }
`;
