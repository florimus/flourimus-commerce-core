import {
  ChangeWarehouseStatusArgsType,
  ContextObjectType,
  StockEntryArgsType,
  WarehouseCreateArgsType,
} from "@core/types";
import {
  WarehouseStatusChange,
  productStockEntry,
  warehouseCreate,
} from "@services/warehouseService";

export const resolverMutations = {
  Mutation: {
    warehouseCreate: async (
      _: unknown,
      args: WarehouseCreateArgsType,
      context: ContextObjectType
    ) => await warehouseCreate(args, context),

    warehouseStatusChange: async (
      _: unknown,
      args: ChangeWarehouseStatusArgsType,
      context: ContextObjectType
    ) => await WarehouseStatusChange(args, context),

    productStockEntry: async (
      _: unknown,
      args: StockEntryArgsType,
      context: ContextObjectType
    ) => await productStockEntry(args, context),
  },
};
