import sequence from "@core/sequence";
import {
  ContextObjectType,
  WarehouseCreateArgsType,
  WarehouseType,
} from "@core/types";
import { getCurrentTime } from "@core/utils/timeUtils";
import BadRequestError from "@errors/BadrequestError";
import warehouseRepository from "@repositories/warehouseRepository";

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

export default {
  warehouseCreate,
};
