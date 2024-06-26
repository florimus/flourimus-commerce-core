import { CartType, LineItemType, OrderStatusTypes } from "@core/types";
import Cart from "@schemas/OrderSchema";
import { FilterQuery } from "mongoose";

const createCart = async (cart: Partial<CartType>) => {
  return await new Cart(cart).save();
};

const getCartById = async (_id: string) => {
  return (await Cart.findOne({ _id })) as CartType;
};

const getOrderById = async (orderId: string, userId?: string) => {
  if (userId) {
    return (await Cart.findOne({ orderId, userId })) as CartType;
  }
  return (await Cart.findOne({ orderId })) as CartType;
};

const getCartByUserIdAndStatus = async (
  userId: string,
  statuses: OrderStatusTypes[]
) => {
  return (await Cart.findOne({
    userId,
    status: { $in: statuses },
  })) as CartType;
};

export const addNewProductCart = async (
  orderId: string,
  newLineItem: LineItemType,
  data: Partial<CartType>
) => {
  return await Cart.findOneAndUpdate(
    { _id: orderId },
    { $push: { lines: newLineItem }, ...data },
    { new: true }
  );
};

export const updateOldProductCart = async (
  orderId: string,
  lineItem: LineItemType,
  data: Partial<CartType>
) => {
  return await Cart.findOneAndUpdate(
    { _id: orderId, "lines.productId": lineItem?.productId },
    { $set: { "lines.$": lineItem, ...data } },
    { new: true }
  );
};

export const removeProductsFromCart = async (
  orderId: string,
  lineItemIds: string[],
  data: Partial<CartType>
) => {
  return await Cart.findOneAndUpdate(
    { _id: orderId },
    {
      $pull: { lines: { productId: { $in: lineItemIds } } },
      $set: data,
    },
    { new: true }
  );
};

export const updateOrder = async (
  orderId: string,
  orderInfo: Partial<CartType>
) => {
  return (await Cart.findOneAndUpdate(
    { _id: orderId },
    { $set: orderInfo },
    { new: true }
  )) as CartType;
};

const getOrderList = async (
  page: number,
  size: number,
  search: string,
  sortBy: string,
  sortDirection: string,
  status: string,
  userId: string,
  isAdmin: boolean
) => {
  const query: FilterQuery<CartType> = {};
  if (search) {
    query.$or = [
      { orderId: { $regex: search, $options: "i" } },
      { userId: { $regex: search, $options: "i" } },
    ];
  }
  query.status = status;
  
  if (!isAdmin || (isAdmin && userId)) {
    query.userId = userId;
  }
  const orders = await Cart.find(query)
    .limit(size)
    .sort({ [sortBy]: sortDirection === "ASC" ? 1 : -1 })
    .skip(size * (page ?? 0))
    .exec();
  const count = await Cart.countDocuments(query);
  return { orders, count };
};

export default {
  createCart,
  getCartByUserIdAndStatus,
  addNewProductCart,
  updateOldProductCart,
  getCartById,
  removeProductsFromCart,
  updateOrder,
  getOrderById,
  getOrderList,
};
