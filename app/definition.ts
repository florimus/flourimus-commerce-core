import productRefs from "src/typeRefs/product";
import customerResolvers from "../src/resolvers/customer";
import cutomerTypeRefs from "../src/typeRefs/customer";
import productResolvers from "@resolvers/product";
import priceTableRefs from "src/typeRefs/price";
import priceTableResolvers from "@resolvers/price";
import warehouseRefs from "src/typeRefs/warehouse";
import warehouseResolvers from "@resolvers/warehouse";
import cartRefs from "src/typeRefs/cart";
import cartResolvers from "@resolvers/cart";

export default {
  typeDefs: [
    cutomerTypeRefs().typeDefs,
    productRefs().typeDefs,
    priceTableRefs().typeDefs,
    warehouseRefs().typeDefs,
    cartRefs().typeDefs,
  ],
  resolvers: [
    customerResolvers(),
    productResolvers(),
    priceTableResolvers(),
    warehouseResolvers(),
    cartResolvers(),
  ],
};
