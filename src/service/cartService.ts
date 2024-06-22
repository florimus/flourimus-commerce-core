import { ContextObjectType, cartItemAddArgsType } from "@core/types";
import cartServiceImpl from "./impl/cartServiceImpl";

/**
 * Controller used to create cart
 * @param context
 * @returns
 */
export const createUserCart = async (context: ContextObjectType) => {
  return await cartServiceImpl.createUserCart(context);
};

/**
 * Controller used to add product to cart
 * @param context
 * @returns
 */
export const addItemToCart = async (
  args: cartItemAddArgsType,
  context: ContextObjectType
) => {
  return await cartServiceImpl.addItemToCart(
    args?.addToCartInput?.lineIds,
    context
  );
};