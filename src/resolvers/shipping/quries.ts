import {
  WarehouseArgsType,
  WarehouseListArgsType,
  WarehouseStockListArgsType,
  WarehouseType,
} from "@core/types";
import {
  WarehouseList,
  warehouseInfo,
  warehouseStockList,
} from "@services/warehouseService";

export const resolverQuries = {
  Query: {
    warehouse: async (_: unknown, args: WarehouseArgsType) =>
      await warehouseInfo(args),

    warehouseList: async (_: unknown, args: WarehouseListArgsType) =>
      await WarehouseList(args),
  },
  Warehouse: {
    stockList: async (
      parent: WarehouseType,
      args: WarehouseStockListArgsType
    ) => await warehouseStockList(parent, args),
  },
};
