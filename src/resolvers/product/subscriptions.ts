import pubsub from "@core/pubSub";
import contants from "@core/constants/contants";

export const resolverSubscriptions = {
  Subscription: {
    productBulkUploadStatus: {
      subscribe: () =>
        pubsub?.asyncIterator([
          contants.subscribtionKeys.PRODUCTS_UPLOAD_STATUS,
        ]),
    },
  },
};
