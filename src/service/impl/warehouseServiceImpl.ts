import sequence from "@core/sequence";
import {
  ContextObjectType,
  ProductStockType,
  StockEntryArgsType,
  WarehouseCreateArgsType,
  WarehouseListArgsType,
  WarehouseStockFilter,
  WarehouseType,
} from "@core/types";
import { getCurrentTime } from "@core/utils/timeUtils";
import BadRequestError from "@errors/BadrequestError";
import NotFoundError from "@errors/NotFoundError";
import warehouseRepository, {
  findWarehousesWithProductStocks,
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
  console.log(warehouse);
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
 * @param stockEntryInput
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

  const product = await productServiceImpl.getProductById(productId);
  if (!product?._id) {
    throw new NotFoundError("Product not found");
  }
  const warehouse = await warehouseRepository.getWarehouseById(warehouseId);
  if (!warehouse?._id) {
    throw new NotFoundError("Warehouse not found");
  }
  const isProductExists =
    await warehouseRepository.isProductAvailableInWarehouse(
      warehouseId,
      productId
    );

  if (!isProductExists) {
    await warehouseRepository.addNewProductStock(
      warehouseId,
      {
        productId,
        saftyStock,
        totalStocks,
        allocatedStocks: 0,
      },
      {
        updatedAt: getCurrentTime(),
        updatedBy: context.email,
      }
    );
  } else {
    await warehouseRepository.updateOldProductStock(
      warehouseId,
      {
        productId,
        saftyStock,
        totalStocks,
        allocatedStocks: 0,
      },
      {
        updatedAt: getCurrentTime(),
        updatedBy: context.email,
      }
    );
  }
  return {
    productId,
    saftyStock,
    totalStocks,
    allocatedStocks: 0,
  };
};

/**
 * Controller used to get warehouse details
 * @param args
 * @returns
 */
export const warehouseInfo = async (_id: string) => {
  if (!_id) {
    throw new BadRequestError("Id is mandatory");
  }
  const warehouse = await warehouseRepository.getWarehouseById(_id);
  if (warehouse?._id) {
    return warehouse;
  }
  throw new NotFoundError("Warehouse not found");
};

export const findProductAvailableStocksByProductId = async (
  productId: string
): Promise<number> => {
  const warehouseStocks: WarehouseStockFilter[] =
    await findWarehousesWithProductStocks(productId);

  if (!Array.isArray(warehouseStocks) || warehouseStocks.length === 0) {
    return 0;
  }

  const { totalStocks, saftyStock, allocatedStocks } = warehouseStocks.reduce(
    (accumulator, current) => {
      accumulator.totalStocks += current.stock?.totalStocks ?? 0;
      accumulator.saftyStock += current.stock?.saftyStock ?? 0;
      accumulator.allocatedStocks += current.stock?.allocatedStocks ?? 0;
      return accumulator;
    },
    { totalStocks: 0, saftyStock: 0, allocatedStocks: 0 }
  );

  return totalStocks - (saftyStock + allocatedStocks);
};

export default {
  warehouseCreate,
  WarehouseStatusChange,
  warehouseList,
  productStockEntry,
  warehouseInfo,
  findProductAvailableStocksByProductId,
};
