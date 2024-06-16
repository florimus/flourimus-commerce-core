import { gql } from "apollo-server-express";

export const ProductSubscriptions = gql`
  type Subscription {
    productBulkUploadStatus: ProductBulkUploadInfo
  }
`;
