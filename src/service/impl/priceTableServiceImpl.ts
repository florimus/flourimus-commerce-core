import {
  ContextObjectType,
  ProductPriceEntryArgsType,
  ProductPriceType,
} from "@core/types";
import BadRequestError from "@errors/BadrequestError";
import { getProductInfoById } from "@repositories/productRepository";

const createNewPriceTable = async (
  parentId: string,
  price: ProductPriceType
) => {
  console.log(parentId, price);
};

/**
 * Controller used to get product by Id
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
  if (!product?.isVariant) {
    await createNewPriceTable(product._id, {
      listPrice: entry?.listPrice,
      productId: entry?.productId,
      sellPrice: entry?.sellPrice,
      taxId: entry?.taxId,
    });
  }
  return {};
};

export default {
  saveProductPrice,
};
