import { ShippingMethodType } from "@core/types";
import Shipping from "@schemas/ShippingSchema";

const createShippingMethod = async (
  shippingMethod: Partial<ShippingMethodType>
) => {
  return await new Shipping(shippingMethod).save();
};

export default {
  createShippingMethod,
};
