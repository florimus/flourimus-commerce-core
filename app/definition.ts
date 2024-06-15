import productRefs from "src/typeRefs/product";
import customerResolvers from "../src/resolvers/customer";
import cutomerTypeRefs from "../src/typeRefs/customer";
import productResolvers from "@resolvers/product";

export default {
  typeDefs: [
    cutomerTypeRefs().typeDefs,
    productRefs().typeDefs,
  ],
  resolvers: {
    ...customerResolvers(),
    ...productResolvers()
  }
}