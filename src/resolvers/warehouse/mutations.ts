import { ContextObjectType, WarehouseCreateArgsType } from "@core/types";
import { warehouseCreate } from "@services/warehouseService";

export const resolverMutations = {
  Mutation: {
    WarehouseCreate: async (
      _: unknown,
      args: WarehouseCreateArgsType,
      context: ContextObjectType
    ) => await warehouseCreate(args, context),
  },
};
