import { ShippingMethodArgsType, ShippingMethodListArgsType } from "@core/types";
import { shippingMethodInfo, shippingMethodList } from "@services/shippingService";

export const resolverQuries = {
  Query: {
    shippingMethod: async (_: unknown, args: ShippingMethodArgsType) =>
      await shippingMethodInfo(args),

    shippingMethods: async (_: unknown, args: ShippingMethodListArgsType) =>
      await shippingMethodList(args),
  },
};
