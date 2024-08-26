import { gql } from "apollo-server-express";

export const CategoryDefs = gql`
  type Category {
    _id: ID
    name: String
    description: String
    parentId: String
    productIds: [String]
    subCategoryIds: [String]
    medias: [String]
    createdAt: String
    updatedAt: String
    isActive: Boolean
    createdBy: String
    updatedBy: String
    metaStatus: String
    productList(productListInput: ProductListInput): ProductList
  }

  # =============== Inputs =================

  input CategoryCreateInput {
    name: String
    parentId: String
    description: String
    medias: [String]
    productIds: [String]
    subCategoryIds: [String]
  }

  input CategoryUpdateInput {
    name: String
    parentId: String
    description: String
    medias: [String]
    productIds: [String]
    subCategoryIds: [String]
  }
`;
