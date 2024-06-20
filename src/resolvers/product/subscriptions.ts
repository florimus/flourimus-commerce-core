import { productBulkUploadStatusCheck } from "@services/productService";

export const resolverSubscriptions = {
  Subscription: {
    productBulkUploadStatus: {
      subscribe: productBulkUploadStatusCheck,
    },
  },
};
