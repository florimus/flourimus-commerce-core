import { WarehouseType } from "@core/types";
import Warehouse from "@schemas/WarehouseSchema";
import { FilterQuery } from "mongoose";

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

const getWarehouseList = async (
  page: number,
  size: number,
  search: string,
  sortBy: string,
  sortDirection: string,
  active: "ACTIVE" | "INACTIVE" | "ALL"
) => {
  const query: FilterQuery<WarehouseType> = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } },
      { id: { $regex: search, $options: "i" } },
    ];
  }
  if (active === "ACTIVE") {
    query.isActive = true;
  } else if (active === "INACTIVE") {
    query.isActive = false;
  }
  const warehouses = await Warehouse.find(query)
    .limit(size)
    .sort({ [sortBy]: sortDirection === "ASC" ? 1 : -1 })
    .skip(size * (page ?? 0))
    .exec();
  const count = await Warehouse.countDocuments(query);
  return { warehouses, count };
};

export const findWarehousesWithProductStocks = async (productId: string) => {
  return (await Warehouse.find({
    "stocks.productId": productId,
  })) as WarehouseType[];
};

export default {
  createWarehouse,
  getWarehouseById,
  updateWarehouse,
  getWarehouseList,
  findWarehousesWithProductStocks,
};
