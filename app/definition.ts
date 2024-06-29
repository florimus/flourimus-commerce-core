import productRefs from "src/typeRefs/product";
import customerResolvers from "../src/resolvers/customer";
import cutomerTypeRefs from "../src/typeRefs/customer";
import productResolvers from "@resolvers/product";
import priceTableRefs from "src/typeRefs/price";
import priceTableResolvers from "@resolvers/price";
import warehouseRefs from "src/typeRefs/warehouse";
import warehouseResolvers from "@resolvers/warehouse";
import orderRefs from "src/typeRefs/order";
import orderResolvers from "@resolvers/order";
import shippingRefs from "src/typeRefs/shipping";
import shippingResolvers from "@resolvers/shipping";

export default {
  typeDefs: [
    cutomerTypeRefs().typeDefs,
    productRefs().typeDefs,
    priceTableRefs().typeDefs,
    warehouseRefs().typeDefs,
    orderRefs().typeDefs,
    shippingRefs().typeDefs,
  ],
  resolvers: [
    customerResolvers(),
    productResolvers(),
    priceTableResolvers(),
    warehouseResolvers(),
    orderResolvers(),
    shippingResolvers(),
  ],
};
