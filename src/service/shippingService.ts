import {
  ContextObjectType,
  ShippingMethodArgsType,
  ShippingMethodCreateArgsType,
  ShippingMethodListArgsType,
  ShippingMethodUpdateArgsType,
} from "@core/types";
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

/**
 * Controller used to update shipping method
 * @param args
 * @returns
 */
export const shippingMethodupdate = async (
  args: ShippingMethodUpdateArgsType,
  context: ContextObjectType
) => {
  return await shippingServiceImpl.shippingMethodupdate(args, context);
};

/**
 * Controller used to list shippingMethods
 * @param args
 * @returns
 */
export const shippingMethodList = async (args: ShippingMethodListArgsType) => {
  return await shippingServiceImpl.shippingMethodList(args.shippingsListInput);
};
