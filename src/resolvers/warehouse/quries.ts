import {
  WarehouseArgsType,
  WarehouseListArgsType,
  WarehouseStockListArgsType,
  WarehousesWithProductArgsType,
  WarehouseType,
} from "@core/types";
import {
  WarehouseList,
  warehouseInfo,
  warehouseStockList,
  warehousesWithProduct,
} from "@services/warehouseService";

export const resolverQuries = {
  Query: {
    warehouse: async (_: unknown, args: WarehouseArgsType) =>
      await warehouseInfo(args),

    warehouseList: async (_: unknown, args: WarehouseListArgsType) =>
      await WarehouseList(args),

    warehousesWithProduct: async (
      _: unknown,
      args: WarehousesWithProductArgsType
    ) => await warehousesWithProduct(args),
  },
  Warehouse: {
    stockList: async (
      parent: WarehouseType,
      args: WarehouseStockListArgsType
    ) => await warehouseStockList(parent, args),
  },
};
