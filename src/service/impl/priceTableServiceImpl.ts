import {
  ContextObjectType,
  ProductPriceEntryArgsType,
  ProductPriceType,
} from "@core/types";
import { getCurrentTime } from "@core/utils/timeUtils";
import BadRequestError from "@errors/BadrequestError";
import NotFoundError from "@errors/NotFoundError";
import {
  createPriceTable,
  getPriceTableByParentId,
  updatePriceTable,
} from "@repositories/priceRepository";
import { getProductInfoById } from "@repositories/productRepository";

/**
 * Create New Price table and add price
 * @param parentId
 * @param price
 * @param context
 * @returns
 */
const createNewPriceTable = async (
  parentId: string,
  price: ProductPriceType,
  context: ContextObjectType
) => {
  const priceTable = await createPriceTable({
    _id: parentId,
    prices: [price],
    isActive: true,
    createdAt: getCurrentTime(),
    updatedAt: getCurrentTime(),
    createdBy: context.email,
    updatedBy: context.email,
  });
  return price;
};

/**
 * Add new price to existing price table
 * @param parentId
 * @param price
 * @param prices
 * @param context
 * @returns
 */
const addPriceToPriceTable = async (
  parentId: string,
  price: ProductPriceType,
  prices: ProductPriceType[],
  context: ContextObjectType
) => {
  await updatePriceTable(parentId, {
    prices: [...prices, price],
    updatedAt: getCurrentTime(),
    updatedBy: context.email,
  });
  return price;
};

/**
 * Update existing price of existing price table
 * @param parentId
 * @param price
 * @param prices
 * @param context
 * @returns
 */
const updatePriceToPriceTable = async (
  parentId: string,
  price: ProductPriceType,
  prices: ProductPriceType[],
  context: ContextObjectType
) => {
  const updatedPriceList = Array.isArray(prices)
    ? prices.map((each) => (each.productId === price.productId ? price : each))
    : [price];
  await updatePriceTable(parentId, {
    prices: updatedPriceList,
    updatedAt: getCurrentTime(),
    updatedBy: context.email,
  });
  return price;
};

/**
 * Controller used to save product price
 * @param args
 * @returns
 */
export const saveProductPrice = async (
  entry: ProductPriceEntryArgsType["productPriceEntryInput"],
  context: ContextObjectType
) => {
  const product = await getProductInfoById(entry?.productId);
  if (!product?._id) {
    throw new BadRequestError("Product not found");
  }
  const price = {
    listPrice: entry?.listPrice,
    productId: entry?.productId,
    sellPrice: entry?.sellPrice,
    taxId: entry?.taxId,
  };
  // For the PRODUCT
  if (!product?.isVariant) {
    const priceTable = await getPriceTableByParentId(product._id);
    if (!priceTable) {
      return await createNewPriceTable(product._id, price, context);
    }
    if (Array.isArray(priceTable?.prices)) {
      const existingPrice = priceTable.prices.find(
        (each) => each?.productId === product._id
      );
      if (existingPrice) {
        return await updatePriceToPriceTable(
          product._id,
          price,
          priceTable.prices,
          context
        );
      }
      return await addPriceToPriceTable(
        product._id!,
        price,
        priceTable.prices,
        context
      );
    }
  }
  // For the VARIANTS
  const priceTable = await getPriceTableByParentId(product.parentId!);
  if (!priceTable) {
    return await createNewPriceTable(product.parentId!, price, context);
  }
  if (Array.isArray(priceTable?.prices)) {
    const existingPrice = priceTable.prices.find(
      (each) => each?.productId === entry?.productId
    );
    if (existingPrice) {
      return await updatePriceToPriceTable(
        product.parentId!,
        price,
        priceTable.prices,
        context
      );
    }
    return await addPriceToPriceTable(
      product.parentId!,
      price,
      priceTable.prices,
      context
    );
  }
  throw new NotFoundError("Product price cannot be set");
};

export const productPriceInfo = async (
  productId: string,
  isVariant: boolean,
  parentId?: string
) => {
  if (isVariant && parentId) {
    const priceTable = await getPriceTableByParentId(parentId);
    return Array.isArray(priceTable?.prices)
      ? priceTable.prices.find((each) => each?.productId === productId)
      : null;
  }
  const priceTable = await getPriceTableByParentId(productId);
  return Array.isArray(priceTable?.prices)
    ? priceTable.prices.find((each) => each?.productId === productId)
    : null;
};

export default {
  saveProductPrice,
  productPriceInfo,
};
