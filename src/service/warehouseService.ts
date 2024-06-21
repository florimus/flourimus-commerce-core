import {
  ChangeWarehouseStatusArgsType,
  ContextObjectType,
  StockEntryArgsType,
  WarehouseCreateArgsType,
  WarehouseListArgsType,
} from "@core/types";
import warehouseServiceImpl from "./impl/warehouseServiceImpl";

/**
 * Controller used to create warehouse
 * @param args
 * @returns
 */
export const warehouseCreate = async (
  args: WarehouseCreateArgsType,
  context: ContextObjectType
) => {
  return await warehouseServiceImpl.warehouseCreate(
    args.warehouseCreateInput,
    context
  );
};

/**
 * Controller used to change warehouse status
 * @param args
 * @returns
 */
export const WarehouseStatusChange = async (
  args: ChangeWarehouseStatusArgsType,
  context: ContextObjectType
) => {
  return await warehouseServiceImpl.WarehouseStatusChange(args._id, context);
};

/**
 * Controller used to list warehouses
 * @param args
 * @returns
 */
export const WarehouseList = async (args: WarehouseListArgsType) => {
  return await warehouseServiceImpl.warehouseList(args.warehouseListInput);
};

/**
 * Controller used to update product stock in warehouse
 * @param args
 * @returns
 */
export const productStockEntry = async (
  args: StockEntryArgsType,
  context: ContextObjectType
) => {
  return await warehouseServiceImpl.productStockEntry(
    args.productStockEntryInput,
    context
  );
};
