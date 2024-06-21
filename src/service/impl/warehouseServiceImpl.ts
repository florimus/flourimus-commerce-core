import { ContextObjectType, WarehouseCreateArgsType } from "@core/types";

/**
 * Controller used to create warehouse
 * @param args
 * @returns
 */
export const warehouseCreate = async (
  input: WarehouseCreateArgsType["warehouseCreateInput"],
  context: ContextObjectType
) => {
  console.log(input);
  return {};
};

export default {
  warehouseCreate,
};
