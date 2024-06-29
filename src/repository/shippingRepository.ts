import { ShippingMethodType } from "@core/types";
import Shipping from "@schemas/ShippingSchema";

const createShippingMethod = async (
  shippingMethod: Partial<ShippingMethodType>
) => {
  return await new Shipping(shippingMethod).save();
};

const getShippingMethodById = async (_id: string, isActive?: boolean) => {
  if (isActive) {
    return (await Shipping.findOne({ _id, isActive })) as ShippingMethodType;
  }
  return (await Shipping.findOne({ _id })) as ShippingMethodType;
};

const updateShippingMethod = async (
  _id: string,
  shippingMethod: Partial<ShippingMethodType>
) => {
  return (await Shipping.findOneAndUpdate(
    { _id },
    { $set: shippingMethod },
    { new: true }
  )) as ShippingMethodType;
};

export default {
  createShippingMethod,
  getShippingMethodById,
  updateShippingMethod,
};
