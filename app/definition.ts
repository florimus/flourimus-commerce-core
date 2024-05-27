import customerResolvers from "../src/resolvers/customer";
import cutomerTypeRefs from "../src/typeRefs/customer";

export default {
  typeDefs: {
    ...cutomerTypeRefs().typeDefs
  },
  resolvers: {
    ...customerResolvers()
  }
}