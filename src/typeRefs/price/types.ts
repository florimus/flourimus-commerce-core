import { gql } from "apollo-server-express";

export const ProductTableDefs = gql`
  type PriceTable {
    _id: ID
    prices: [ProductPrice]
    createdAt: String
    updatedAt: String
    isActive: Boolean
    createdBy: String
    updatedBy: String
    metaStatus: String
  }

  type ProductPrice {
    productId: String
    listPrice: Float
    sellPrice: Float
    taxPrice: Float
  }

  # =============== Inputs =================

  input ProductPriceEntryInput {
    parentId: String
    productId: String
    isVariant: Boolean
    listPrice: Float
    sellPrice: Float
    taxId: String
  }
`;
