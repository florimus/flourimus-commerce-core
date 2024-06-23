import { LineItemType, ProductType } from "@core/types";
import { getProductInfoById } from "@repositories/productRepository";
import { productPriceInfo } from "@services/priceTableService";

const cartPriceCalculator = async (products: LineItemType[]) => {
  let gross = 0;
  let net = 0;
  const discounts = 0;
  const shipping = 0;
  const tax = 0;

  const productPromises = products.map(({ productId }) =>
    getProductInfoById(productId, true)
  );
  const productInfos = await Promise.all(productPromises);

  const validProducts = productInfos.filter((product) => product?.isSellable);

  const pricePromises = validProducts.map((product) =>
    productPriceInfo(product._id, product.isVariant, product.parentId)
  );
  const priceInfos = await Promise.all(pricePromises);

  products.forEach((product, index) => {
    const { quantity } = product || {};
    const basicPriceInfo = priceInfos[index];
    if (basicPriceInfo?.listPrice) {
      gross += basicPriceInfo.listPrice * quantity;
    }
    if (basicPriceInfo?.sellPrice) {
      net += basicPriceInfo.sellPrice * quantity;
    }
  });

  // TODO: Calculate tax, discount calculations...

  return {
    gross,
    net,
    discounts,
    shipping,
    tax,
    total: net + shipping + tax - discounts,
  };
};

export const productPriceCalculatorInPayment = async (
  product: ProductType,
) => {
  let gross = 0;
  let net = 0;
  const discounts = 0;
  const shipping = 0;
  const tax = 0;
  const basicPriceInfo = await productPriceInfo(
    product._id,
    product.isVariant,
    product.parentId
  );
  if (basicPriceInfo?.listPrice) {
    gross += basicPriceInfo.listPrice;
  }
  if (basicPriceInfo?.sellPrice) {
    net += basicPriceInfo.sellPrice;
  }
  return {
    gross,
    net,
    discounts,
    shipping,
    tax,
    total: net + shipping + tax - discounts,
  };
};

export default cartPriceCalculator;
