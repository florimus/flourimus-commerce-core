import sequence from "@core/sequence";
import {
  ChangeWarehouseStatusArgsType,
  ContextObjectType,
  WarehouseCreateArgsType,
  WarehouseType,
} from "@core/types";
import { getCurrentTime } from "@core/utils/timeUtils";
import BadRequestError from "@errors/BadrequestError";
import NotFoundError from "@errors/NotFoundError";
import warehouseRepository, {
  getWarehouseById,
} from "@repositories/warehouseRepository";

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

export default {
  warehouseCreate,
  WarehouseStatusChange,
};
