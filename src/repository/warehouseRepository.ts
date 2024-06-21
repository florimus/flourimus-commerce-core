import { WarehouseType } from "@core/types";
import Warehouse from "@schemas/WarehouseSchema";

const createWarehouse = async (warehouse: WarehouseType) => {
  return await new Warehouse(warehouse).save();
};

export const getWarehouseById = async (_id: string, isActive?: boolean) => {
  if (isActive) {
    return (await Warehouse.findOne({ _id, isActive })) as WarehouseType;
  }
  return (await Warehouse.findOne({ _id })) as WarehouseType;
};

export const updateWarehouse = async (
  _id: string,
  data: Partial<WarehouseType>
) => {
  return Warehouse.updateOne({ _id }, { $set: data });
};

export default {
  createWarehouse,
  getWarehouseById,
  updateWarehouse,
};
