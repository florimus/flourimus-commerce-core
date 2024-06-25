import {
  LineItemType,
  PaymentCalculatedPriceInfoResponseType,
  PricedProductInfo,
} from "@core/types";
import { getProductInfoById } from "@repositories/productRepository";
import { productPriceInfo } from "@services/priceTableService";

const cartPriceCalculator = async (products: LineItemType[]) => {
  let gross = 0;
  let net = 0;
  const discounts = 0;
  const shipping = 0;
  const tax = 0;

  const pricedProductInfos: PricedProductInfo[] = [];

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
    const pricedProductInfo = {
      product: validProducts[index],
      unit: {
        gross: 0,
        net: 0,
        discounts: 0,
        shipping: 0,
        tax: 0,
      },
      order: {
        gross: 0,
        net: 0,
        discounts: 0,
        shipping: 0,
        tax: 0,
      },
      quantity,
    } as PricedProductInfo;
    if (basicPriceInfo?.listPrice) {
      pricedProductInfo.unit.gross = basicPriceInfo.listPrice;
      pricedProductInfo.order.gross = basicPriceInfo.listPrice * quantity;
      gross += basicPriceInfo.listPrice * quantity;
    }
    if (basicPriceInfo?.sellPrice) {
      pricedProductInfo.unit.net = basicPriceInfo.sellPrice;
      pricedProductInfo.order.net = basicPriceInfo.sellPrice * quantity;
      net += basicPriceInfo.sellPrice * quantity;
    }
    pricedProductInfos.push(pricedProductInfo);
  });

  // TODO: Calculate tax, discount calculations...

  return {
    pricedProductInfos,
    gross,
    net,
    discounts,
    shipping,
    tax,
    total: net + shipping + tax - discounts,
  } as PaymentCalculatedPriceInfoResponseType;
};

export default cartPriceCalculator;
