import { ContextObjectType, ShippingMethodCreateArgsType } from "@core/types";
import { shippingMethodCreate } from "@services/shippingService";

export const resolverMutations = {
  Mutation: {
    shippingMethodCreate: async (
      _: unknown,
      args: ShippingMethodCreateArgsType,
      context: ContextObjectType
    ) => await shippingMethodCreate(args, context),
  },
};
