import { gql } from "apollo-server-express";

export const CategoryDefs = gql`
  type Category {
    _id: ID
    name: String
    description: String
    productIds: [String]
    subCategoryIds: [String]
    medias: [String]
    createdAt: String
    updatedAt: String
    isActive: Boolean
    createdBy: String
    updatedBy: String
    metaStatus: String
  }

  # =============== Inputs =================

  input CategoryCreateInput {
    name: String
    description: String
    medias: [String]
    productIds: [String]
  }
`;
