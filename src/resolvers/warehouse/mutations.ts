import {
  ChangeWarehouseStatusArgsType,
  ContextObjectType,
  WarehouseCreateArgsType,
} from "@core/types";
import {
  WarehouseStatusChange,
  warehouseCreate,
} from "@services/warehouseService";

export const resolverMutations = {
  Mutation: {
    WarehouseCreate: async (
      _: unknown,
      args: WarehouseCreateArgsType,
      context: ContextObjectType
    ) => await warehouseCreate(args, context),

    WarehouseStatusChange: async (
      _: unknown,
      args: ChangeWarehouseStatusArgsType,
      context: ContextObjectType
    ) => await WarehouseStatusChange(args, context),
  },
};
