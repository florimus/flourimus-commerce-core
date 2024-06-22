import { CartType, ContextObjectType } from "@core/types";
import { getCurrentTime } from "@core/utils/timeUtils";
import orderRepository from "@repositories/orderRepository";
import { v4 as uuidv4 } from "uuid";

/**
 * Controller used to create cart
 * @param context
 * @returns
 */
export const createUserCart = async (context: ContextObjectType) => {
  const esxistingCart = await orderRepository.getCartByUserIdAndStatus(
    context._id,
    ["CREATED", "PAYMENT_DECLINED"]
  );
  if (esxistingCart?._id) {
    return esxistingCart;
  }
  const cartDetails: CartType = {
    _id: uuidv4(),
    userId: context._id,
    isActive: true,
    lines: [],
    status: "CREATED",
    isAnonymous: context.isAnonymous,
    createdBy: context.email,
    updatedAt: context.email,
    createdAt: getCurrentTime(),
    updatedBy: getCurrentTime(),
  };
  return await orderRepository.createCart(cartDetails);
};

export default {
  createUserCart,
};
