import { ShippingMethodType } from "@core/types";
import Shipping from "@schemas/ShippingSchema";
import { FilterQuery } from "mongoose";

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

const getShippingMethodList = async (
  page: number,
  size: number,
  search: string,
  sortBy: string,
  sortDirection: string
) => {
  const query: FilterQuery<ShippingMethodType> = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { id: { $regex: search, $options: "i" } },
    ];
  }
  const shippings = await Shipping.find(query)
    .limit(size)
    .sort({ [sortBy]: sortDirection === "ASC" ? 1 : -1 })
    .skip(size * (page ?? 0))
    .exec();
  const count = await Shipping.countDocuments(query);
  return { shippings, count };
};

export default {
  createShippingMethod,
  getShippingMethodById,
  updateShippingMethod,
  getShippingMethodList,
};
