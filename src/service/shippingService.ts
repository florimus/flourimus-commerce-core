import { ContextObjectType, ShippingMethodCreateArgsType } from "@core/types";
import shippingServiceImpl from "./impl/shippingServiceImpl";

/**
 * Controller used to create shipping method
 * @param args
 * @returns
 */
export const shippingMethodCreate = async (
  args: ShippingMethodCreateArgsType,
  context: ContextObjectType
) => {
  return await shippingServiceImpl.shippingMethodCreate(
    args.shippingMethodCreateInput,
    context
  );
};
