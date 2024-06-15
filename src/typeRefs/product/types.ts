import { gql } from "apollo-server-express";

export const ProductDefs = gql`
  type Product {
    _id: String
    name: String
    medias: [String]
    parentId: String
    category: String
    haveVariants: Boolean
    isVariant: Boolean
    isSellable: Boolean
    variantInfo: String
  }

  # =============== Inputs =================
`;
