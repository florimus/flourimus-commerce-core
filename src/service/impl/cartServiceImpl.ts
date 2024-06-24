import {
  CartAddressesType,
  CartType,
  ContextObjectType,
  LineItemType,
  PaymentCustomerType,
  PaymentLineItem,
  PaymentShippingCharge,
  ProductType,
  CartAddressArgsType,
  SubmitOrderArgsType,
  PaymentIntentType,
} from "@core/types";
import { getCurrentTime } from "@core/utils/timeUtils";
import BadRequestError from "@errors/BadrequestError";
import NotFoundError from "@errors/NotFoundError";
import orderRepository from "@repositories/orderRepository";
import productRepository, {
  getProductInfoById,
} from "@repositories/productRepository";
import { findProductAvailableStocksByProductId } from "@services/warehouseService";
import { v4 as uuidv4 } from "uuid";
import cartPriceCalculator, {
  productPriceCalculatorInPayment,
} from "./priceCalculator";
import paymentServices from "./paymentServices";
import contants from "@core/constants/contants";

/**
 * Controller used to create cart
 * @param context
 * @returns
 */
export const createUserCart = async (context: ContextObjectType) => {
  const esxistingCart = await orderRepository.getCartByUserIdAndStatus(
    context._id,
    ["CREATED", "PAYMENT_DECLINED", "PAYMENT_INITIATED"]
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
    const productDetails = await getProductInfoById(lineIds[i], true);
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
  const allLineItems = Promise.all(
    products.map(async (lineItem: LineItemType) => {
      const product = await productRepository.getProductInfoById(
        lineItem?.productId,
        true
      );
      if (product?.isSellable) {
        return {
          quantity: lineItem?.quantity,
          product,
          adjustments: lineItem?.adjustments,
        };
      }
    })
  );
  return (await allLineItems).filter((each) => each?.product);
};

/**
 * Controller used to get cart details
 * @param context
 * @returns
 */
export const viewCart = async (_id: string) => {
  if (!_id) {
    throw new BadRequestError("CardId is mandatory");
  }
  const cart = await orderRepository.getCartById(_id);
  if (cart?._id) {
    return cart;
  }
  throw new NotFoundError("Cart not found");
};

/**
 * Controller used to calculate cart price
 * @param context
 * @returns
 */
export const calucateCartPrice = async (cart: CartType) => {
  const products =
    Array.isArray(cart?.lines) && cart?.lines.length > 0 ? cart.lines : null;
  if (Array.isArray(products) && products.length) {
    return await cartPriceCalculator(products);
  }
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
  const { shipping, billing, isSameAsBilling } = args || {};
  const esxistingCart = await orderRepository.getCartByUserIdAndStatus(
    context._id,
    ["CREATED", "PAYMENT_DECLINED", "PAYMENT_INITIATED"]
  );
  if (!shipping) {
    throw new BadRequestError("Invalid shipping address");
  }
  if (!isSameAsBilling && !billing) {
    throw new BadRequestError("Invalid billing address");
  }
  const updatedAddress: Partial<CartType> = {
    shippingAddress: isSameAsBilling ? billing : shipping,
    billingAddress: billing,
    updatedAt: getCurrentTime(),
    updatedBy: context.email,
  };
  const updatedcart = await orderRepository.updateOrder(
    esxistingCart?._id,
    updatedAddress
  );
  if (updatedcart?.isActive) {
    return updatedcart;
  }
  throw new NotFoundError("No progressing cart found");
};

/**
 * Controller used to initiate payment
 * @param context
 * @returns
 */
export const initiateCartPayment = async (context: ContextObjectType) => {
  const currentCart = await orderRepository.getCartByUserIdAndStatus(
    context._id,
    ["CREATED", "PAYMENT_DECLINED", "PAYMENT_INITIATED"]
  );
  if (!currentCart?.isActive) {
    throw new BadRequestError("no cart available");
  }
  const cartAddress: CartAddressesType | undefined =
    currentCart.shippingAddress;
  if (!cartAddress) {
    throw new BadRequestError("No addresses in cart");
  }
  const customerInfo: PaymentCustomerType = {
    name: context.isAnonymous
      ? "anonymous"
      : `${context.firstName} ${context.lastName}`,
    address: {
      line1: cartAddress.point,
      postal_code: cartAddress.pin.toString(),
      city: cartAddress.city,
      state: "kl",
      country: "in",
    },
  };
  const lineItems = Array.isArray(currentCart.lines) ? currentCart.lines : [];
  if (!lineItems.length) {
    throw new BadRequestError("No products in cart");
  }
  const productPromises = lineItems.map(({ productId }) =>
    getProductInfoById(productId, true)
  );
  const productInfos: ProductType[] = await Promise.all(productPromises);

  if (!Array.isArray(productInfos) || !productInfos.length) {
    throw new BadRequestError("Products not sellablble");
  }

  const paymentLineItemsPromise = Promise.all(
    productInfos.map(async (product: ProductType) => {
      const quantity = lineItems.find(
        (item) => item.productId === product._id
      )?.quantity;
      const productPrice = await productPriceCalculatorInPayment(product);
      return {
        price_data: {
          currency: contants.paymentConstants.CURRENCY.IND,
          product_data: {
            name: product.name,
            images: product.medias,
          },
          unit_amount: productPrice.total * contants.paymentConstants.INR_STD,
        },
        quantity,
      } as PaymentLineItem;
    })
  );

  const shippingOptions: PaymentShippingCharge = {
    shipping_rate_data: {
      display_name: "Standard Shipping",
      type: "fixed_amount",
      fixed_amount: {
        amount: 5000,
        currency: contants.paymentConstants.CURRENCY.IND,
      },
    },
  };

  const initiatePaymentInfo = await paymentServices.initiatePayment(
    customerInfo,
    await paymentLineItemsPromise,
    shippingOptions
  );
  if (!initiatePaymentInfo.url || !initiatePaymentInfo.id) {
    throw new BadRequestError("Cannot initialize the cart now");
  }
  await orderRepository.updateOrder(currentCart._id, {
    status: "PAYMENT_INITIATED",
    sessionId: initiatePaymentInfo.id,
    updatedAt: getCurrentTime(),
    updatedBy: context.email,
  });
  return {
    link: initiatePaymentInfo.url,
  };
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
  const { sessionId } = args || {};
  if (!sessionId) {
    throw new BadRequestError("sessionId is mandatory");
  }
  const userOrder = await orderRepository.getCartByUserIdAndStatus(
    context._id,
    ["PAYMENT_INITIATED"]
  );
  if (
    !userOrder?.isActive ||
    !userOrder?.sessionId ||
    userOrder?.sessionId !== sessionId
  ) {
    throw new NotFoundError("User order not found");
  }
  const paymentDetails: PaymentIntentType =
    await paymentServices.fetchPaymentDetails(sessionId);
  console.log(paymentDetails); //TODO: remove later
  return {};
};

export default {
  createUserCart,
  addItemToCart,
  fetchCartLineItemProducts,
  removeItemFromCart,
  viewCart,
  calucateCartPrice,
  addAddressToCart,
  initiateCartPayment,
  submitUserOrder,
};
