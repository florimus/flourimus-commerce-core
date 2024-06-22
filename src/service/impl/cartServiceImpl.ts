import { CartType, ContextObjectType, cartItemAddArgsType } from "@core/types";
import { getCurrentTime } from "@core/utils/timeUtils";
import BadRequestError from "@errors/BadrequestError";
import NotFoundError from "@errors/NotFoundError";
import orderRepository from "@repositories/orderRepository";
import productRepository, {
  getProductInfoById,
} from "@repositories/productRepository";
import { findProductAvailableStocksByProductId } from "@services/warehouseService";
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

/**
 * Controller used to add products to cart
 * @param context
 * @returns
 */
export const addItemToCart = async (
  lineIds: string[],
  context: ContextObjectType
) => {
  if (Array.isArray(lineIds) && lineIds.length <= 0) {
    throw new BadRequestError("LineIds mandatory");
  }
  const cart = await createUserCart(context);
  const cartItems = cart?.lines || [];
  for (let i = 0; i < lineIds.length; i++) {
    const productDetails = await getProductInfoById(lineIds[i]);
    if (!productDetails?._id) {
      throw new BadRequestError(`Product not found: ${lineIds[i]}`);
    }
    if (!productDetails?.isSellable) {
      throw new BadRequestError(`Product not sellable: ${lineIds[i]}`);
    }
    const stock = await findProductAvailableStocksByProductId(lineIds[i]);
    if (!stock) {
      throw new BadRequestError(`Product out of stock: ${lineIds[i]}`);
    }
    const exisingItem = cartItems?.find(
      (item) => item?.productId === lineIds[i]
    );
    if (exisingItem) {
      return await orderRepository.updateOldProductCart(
        cart._id,
        {
          productId: exisingItem.productId,
          quantity: exisingItem.quantity + 1,
          adjustments: exisingItem.adjustments || "",
        },
        { updatedAt: getCurrentTime(), updatedBy: context.email }
      );
    }
    return await orderRepository.addNewProductCart(
      cart._id,
      {
        productId: lineIds[i],
        quantity: 1,
        adjustments: "",
      },
      { updatedAt: getCurrentTime(), updatedBy: context.email }
    );
  }
};

/**
 * Controller used to remove products to cart
 * @param context
 * @returns
 */
export const removeItemFromCart = async (
  lineIds: string[],
  context: ContextObjectType
) => {
  const cart = await createUserCart(context);
  const cartItems = cart?.lines || [];

  for (let i = 0; i < lineIds.length; i++) {
    const exisingItem = cartItems?.find(
      (item) => item?.productId === lineIds[i]
    );
    if (!exisingItem) {
      throw new NotFoundError("Product not found in the cart");
    }
    if (exisingItem.quantity > 1) {
      return await orderRepository.updateOldProductCart(
        cart._id,
        {
          productId: exisingItem.productId,
          quantity: exisingItem.quantity - 1,
          adjustments: exisingItem.adjustments || "",
        },
        { updatedAt: getCurrentTime(), updatedBy: context.email }
      );
    }
    return await orderRepository.removeProductsFromCart(
      cart._id,
      [lineIds[i]],
      { updatedAt: getCurrentTime(), updatedBy: context.email }
    );
  }
};

/**
 * Controller used to find product details of cartLineItems
 * @param context
 * @returns
 */
export const fetchCartLineItemProducts = async (cart: CartType) => {
  const products =
    Array.isArray(cart?.lines) && cart?.lines.length > 0 ? cart.lines : null;
  if (!products) {
    return [];
  }
  return Promise.all(
    products.map(async (lineItem) => {
      const product = await productRepository.getProductInfoById(
        lineItem?.productId
      );
      return {
        quantity: lineItem?.quantity,
        product,
        adjustments: lineItem?.adjustments,
      };
    })
  );
};

export default {
  createUserCart,
  addItemToCart,
  fetchCartLineItemProducts,
  removeItemFromCart,
};
