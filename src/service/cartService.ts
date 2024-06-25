import {
  CartArgsType,
  CartType,
  ContextObjectType,
  CartAddressArgsType,
  CartItemAddArgsType,
  CartItemRemoveArgsType,
  SubmitOrderArgsType,
  InitiateOrderArgsType,
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
  args: CartItemAddArgsType,
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
  args: CartItemRemoveArgsType,
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
  args: CartAddressArgsType,
  context: ContextObjectType
) => {
  return await cartServiceImpl.addAddressToCart(args, context);
};

/**
 * Controller used to initiate payment
 * @param context
 * @returns
 */
export const initiateCartPayment = async (
  args: InitiateOrderArgsType,
  context: ContextObjectType
) => {
  return await cartServiceImpl.initiateCartPayment(args.method, context);
};

/**
 * Controller used to submit order
 * @param context
 * @returns
 */
export const submitUserOrder = async (
  args: SubmitOrderArgsType,
  context: ContextObjectType
) => {
  return await cartServiceImpl.submitUserOrder(args, context);
};

/**
 * Controller used to submit COD order
 * @param context
 * @returns
 */
export const submitCodOrder = async (
  context: ContextObjectType
) => {
  return await cartServiceImpl.submitCodOrder(context);
};
