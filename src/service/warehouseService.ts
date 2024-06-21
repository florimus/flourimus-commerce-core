import { ContextObjectType, WarehouseCreateArgsType } from "@core/types";
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
