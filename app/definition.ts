import productRefs from "src/typeRefs/product";
import customerResolvers from "../src/resolvers/customer";
import cutomerTypeRefs from "../src/typeRefs/customer";

export default {
  typeDefs: [
    cutomerTypeRefs().typeDefs,
    productRefs().typeDefs,
  ],
  resolvers: [
    customerResolvers(),
  ]
}