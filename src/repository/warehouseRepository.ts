import { WarehouseType } from "@core/types";
import Warehouse from "@schemas/WarehouseSchema";

const createWarehouse = async (warehouse: WarehouseType) => {
  return await new Warehouse(warehouse).save();
};

export default {
  createWarehouse,
};
