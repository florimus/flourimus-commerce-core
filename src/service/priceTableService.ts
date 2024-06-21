import { ContextObjectType, ProductPriceEntryArgsType } from "@core/types";
import priceTableServiceImpl from "./impl/priceTableServiceImpl";

/**
 * Controller used to save product price
 * @param args
 * @returns
 */
export const saveProductPrice = async (
  args: ProductPriceEntryArgsType,
  context: ContextObjectType
) => {
  return await priceTableServiceImpl.saveProductPrice(
    args.productPriceEntryInput,
    context
  );
};

export const productPriceInfo = async (
  productId: string,
  isVariant: boolean,
  parentId?: string
) => {
  return await priceTableServiceImpl.productPriceInfo(
    productId,
    isVariant,
    parentId
  );
};
