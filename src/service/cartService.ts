import {
  CartArgsType,
  CartType,
  ContextObjectType,
  cartAddressArgsType,
  cartItemAddArgsType,
  cartItemRemoveArgsType,
} from "@core/types";
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

/**
 * Controller used to add product to cart
 * @param context
 * @returns
 */
export const removeItemFromCart = async (
  args: cartItemRemoveArgsType,
  context: ContextObjectType
) => {
  return await cartServiceImpl.removeItemFromCart(args.productId, context);
};

/**
 * Controller used to find product details of cartLineItems
 * @param context
 * @returns
 */
export const fetchCartLineItemProducts = async (cart: CartType) => {
  return await cartServiceImpl.fetchCartLineItemProducts(cart);
};

/**
 * Controller used to get cart details
 * @param context
 * @returns
 */
export const viewCart = async (args: CartArgsType) => {
  return await cartServiceImpl.viewCart(args._id);
};

/**
 * Controller used to calculate cart price
 * @param context
 * @returns
 */
export const calucateCartPrice = async (cart: CartType) => {
  return await cartServiceImpl.calucateCartPrice(cart);
};

/**
 * Controller used to add address to cart
 * @param context
 * @returns
 */
export const addAddressToCart = async (
  args: cartAddressArgsType,
  context: ContextObjectType
) => {
  return await cartServiceImpl.addAddressToCart(args, context);
};
