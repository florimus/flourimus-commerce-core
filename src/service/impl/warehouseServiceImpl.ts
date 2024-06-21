import sequence from "@core/sequence";
import {
  ContextObjectType,
  ProductStockType,
  StockEntryArgsType,
  WarehouseCreateArgsType,
  WarehouseListArgsType,
  WarehouseType,
} from "@core/types";
import { getCurrentTime } from "@core/utils/timeUtils";
import BadRequestError from "@errors/BadrequestError";
import NotFoundError from "@errors/NotFoundError";
import warehouseRepository, {
  getWarehouseById,
} from "@repositories/warehouseRepository";
import productServiceImpl from "./productServiceImpl";

/**
 * Controller used to create warehouse
 * @param args
 * @returns
 */
export const warehouseCreate = async (
  input: WarehouseCreateArgsType["warehouseCreateInput"],
  context: ContextObjectType
) => {
  const { country, name } = input || {};
  if (!country || !name) {
    throw new BadRequestError("Invalid request");
  }
  const warehouseId = await sequence.warehouseId();
  const warehouse: WarehouseType = {
    _id: warehouseId,
    country,
    name,
    stocks: [],
    isActive: true,
    createdAt: getCurrentTime(),
    createdBy: context.email,
    updatedAt: getCurrentTime(),
    updatedBy: context.email,
  };
  return await warehouseRepository.createWarehouse(warehouse);
};

/**
 * Controller used to change warehouse status
 * @param args
 * @returns
 */
export const WarehouseStatusChange = async (
  _id: string,
  context: ContextObjectType
) => {
  if (!_id) {
    throw new BadRequestError("Warehouse id is mandatory");
  }
  const warehouse = await getWarehouseById(_id);
  if (warehouse?._id) {
    await warehouseRepository.updateWarehouse(_id, {
      isActive: !warehouse.isActive,
      updatedAt: getCurrentTime(),
      updatedBy: context.email,
    });
    return {
      success: true,
      status: !warehouse.isActive,
    };
  }
  throw new NotFoundError("Warehouse not found");
};

/**
 * Controller used to list warehouses
 * @param args
 * @returns
 */
export const warehouseList = async (
  listArgs: WarehouseListArgsType["warehouseListInput"]
) => {
  const {
    page = 0,
    size = 5,
    search,
    sortBy = "updatedAt",
    sortDirection = "DESC",
    active = "ALL",
  } = listArgs || {};
  const { warehouses, count } = await warehouseRepository.getWarehouseList(
    page,
    size,
    search,
    sortBy,
    sortDirection,
    active
  );
  const totalPages = Math.ceil(count / size);
  const pageInfo = {
    isStart: page === 0,
    isEnd: page >= totalPages - 1,
    totalPages,
    totalMatches: count,
    currentMatchs: warehouses.length,
  };

  return {
    warehouses,
    pageInfo,
  };
};

/**
 * Controller used to update product stock in warehouse
 * @param args
 * @returns
 */
export const productStockEntry = async (
  stockEntryInput: StockEntryArgsType["productStockEntryInput"],
  context: ContextObjectType
) => {
  const { productId, saftyStock, totalStocks, warehouseId } =
    stockEntryInput || {};
  if (!productId || !warehouseId) {
    throw new BadRequestError("Invalid request");
  }
  const warehouse = await warehouseRepository.getWarehouseById(warehouseId);
  if (!warehouse?._id) {
    throw new NotFoundError("Warehouse not found");
  }
  const product = await productServiceImpl.getProductById(productId);
  if (!product?._id) {
    throw new NotFoundError("Product not found");
  }
  const stockDetails: ProductStockType = {
    productId,
    saftyStock,
    totalStocks,
    allocatedStocks: 0,
  };
  const allStocks = Array.isArray(warehouse.stocks) ? warehouse.stocks : [];
  const existingStock = allStocks.find((each) => each?.productId === productId);
  if (!existingStock) {
    await warehouseRepository.updateWarehouse(warehouseId, {
      stocks: [...allStocks, stockDetails],
      updatedAt: getCurrentTime(),
      updatedBy: context.email,
    });
    return stockDetails;
  }
  const updatedStock = allStocks.map((each) =>
    each?.productId === productId ? stockDetails : each
  );
  await warehouseRepository.updateWarehouse(warehouseId, {
    stocks: updatedStock,
    updatedAt: getCurrentTime(),
    updatedBy: context.email,
  });
  return stockDetails;
};

export default {
  warehouseCreate,
  WarehouseStatusChange,
  warehouseList,
  productStockEntry,
};
