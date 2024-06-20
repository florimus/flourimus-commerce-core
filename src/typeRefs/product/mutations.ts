import { gql } from "apollo-server-express";

export const ProductMutations = gql`
  scalar Upload
  type Mutation {
    productCreate(productCreateInput: ProductCreateInput): Product
    productUpdate(_id: ID!, productUpdateInput: ProductUpdateInput): Product
    productStatusChange(_id: ID!): ProductStatusChangeResponse
    productBulkUpload(file: Upload!): Boolean
  }
`;
