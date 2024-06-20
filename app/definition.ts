import productRefs from "src/typeRefs/product";
import customerResolvers from "../src/resolvers/customer";
import cutomerTypeRefs from "../src/typeRefs/customer";
import productResolvers from "@resolvers/product";
import priceTableRefs from "src/typeRefs/price";

export default {
  typeDefs: [
    cutomerTypeRefs().typeDefs,
    productRefs().typeDefs,
    priceTableRefs().typeDefs,
  ],
  resolvers: [customerResolvers(), productResolvers()],
};
