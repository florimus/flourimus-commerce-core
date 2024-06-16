import { gql } from "apollo-server-express";

export const ProductDefs = gql`
  type Product {
    _id: ID
    name: String
    medias: [String]
    parentId: String
    category: String
    brand: String
    haveVariants: Boolean
    isVariant: Boolean
    isSellable: Boolean
    variantInfo: [String]
    createdAt: String
    updatedAt: String
    isActive: Boolean
    createdBy: String
    updatedBy: String
    metaStatus: String
    variants: [Product]
  }

  type ProductStatusChangeResponse {
    success: Boolean
    status: Boolean
  }

  # =============== Inputs =================
  input ProductCreateInput {
    name: String!
    medias: [String]
    parentId: String
    category: String
    brand: String
    isVariant: Boolean
    isSellable: Boolean
  }

  input ProductUpdateInput {
    name: String
    medias: [String]
    category: String
    brand: String
    isSellable: Boolean
  }
`;
