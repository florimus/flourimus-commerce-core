import { ContextObjectType, ShippingMethodCreateArgsType, ShippingMethodUpdateArgsType } from "@core/types";
import { shippingMethodCreate, shippingMethodupdate } from "@services/shippingService";

export const resolverMutations = {
  Mutation: {
    shippingMethodCreate: async (
      _: unknown,
      args: ShippingMethodCreateArgsType,
      context: ContextObjectType
    ) => await shippingMethodCreate(args, context),

    shippingMethodUpdate: async (
      _: unknown,
      args: ShippingMethodUpdateArgsType,
      context: ContextObjectType
    ) => await shippingMethodupdate(args, context),
  },
};
