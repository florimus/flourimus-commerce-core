import { WarehouseListArgsType } from "@core/types";
import { WarehouseList } from "@services/warehouseService";

export const resolverQuries = {
  Query: {
    warehouseList: async (_: unknown, args: WarehouseListArgsType) =>
      await WarehouseList(args),
  },
};
