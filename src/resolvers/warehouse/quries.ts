import { WarehouseArgsType, WarehouseListArgsType } from "@core/types";
import { WarehouseList, warehouseInfo } from "@services/warehouseService";

export const resolverQuries = {
  Query: {
    warehouse: async (_: unknown, args: WarehouseArgsType) =>
      await warehouseInfo(args),

    warehouseList: async (_: unknown, args: WarehouseListArgsType) =>
      await WarehouseList(args),
  },
};
