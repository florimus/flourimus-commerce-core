import { gql } from "apollo-server-express";

export const ProductDefs = gql`
  type Product {
    _id: ID
    name: String
    medias: [String]
    shortDescription: String
    description: String
    parentId: String
    category: String
    brand: String
    haveVariants: Boolean
    isVariant: Boolean
    isSellable: Boolean
    isCodAvailable: Boolean
    variantInfo: [String]
    createdAt: String
    updatedAt: String
    isActive: Boolean
    createdBy: String
    updatedBy: String
    metaStatus: String
    variants: [Product]
    price: ProductPrice
    availableStocks: Int
  }

  type ProductStatusChangeResponse {
    success: Boolean
    status: Boolean
  }

  type ProductList {
    products: [Product]
    pageInfo: ProductPageInfo
  }

  type ProductPageInfo {
    isStart: Boolean
    isEnd: Boolean
    totalPages: Int
    totalMatches: Int
    currentMatchs: Int
  }

  type ProductBulkUploadInfo {
    isAvailable: Boolean
    startTime: String
    Estimate: String
    totalDocuments: Int
    completedDocuments: Int
    createdBy: String
    progress: Int
  }

  # =============== Inputs =================
  input ProductCreateInput {
    name: String!
    medias: [String]
    shortDescription: String
    description: String
    parentId: String
    category: String
    brand: String
    isVariant: Boolean
    isSellable: Boolean
    isCodAvailable: Boolean
  }

  input ProductUpdateInput {
    name: String
    medias: [String]
    shortDescription: String
    description: String
    category: String
    brand: String
    isSellable: Boolean
    isCodAvailable: Boolean
  }

  input ProductListInput {
    search: String
    page: Int
    size: Int
    sortBy: String
    sortDirection: String
    active: String
    type: String
  }
`;
