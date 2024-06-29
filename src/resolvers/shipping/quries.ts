import { ShippingMethodArgsType } from "@core/types";
import { shippingMethodInfo } from "@services/shippingService";

export const resolverQuries = {
  Query: {
    shippingMethod: async (_: unknown, args: ShippingMethodArgsType) =>
      await shippingMethodInfo(args),
  },
};
