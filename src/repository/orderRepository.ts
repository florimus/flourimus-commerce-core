import { CartType, OrderStatusTypes } from "@core/types";
import Cart from "@schemas/OrderSchema";

const createCart = async (cart: Partial<CartType>) => {
  return await new Cart(cart).save();
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

export default {
  createCart,
  getCartByUserIdAndStatus,
};
