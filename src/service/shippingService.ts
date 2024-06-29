import { ContextObjectType, ShippingMethodArgsType, ShippingMethodCreateArgsType } from "@core/types";
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

/**
 * Controller used to get shippingMethod details
 * @param args
 * @returns
 */
export const shippingMethodInfo = async (args: ShippingMethodArgsType) => {
  return await shippingServiceImpl.shippingMethodInfo(args._id);
};
