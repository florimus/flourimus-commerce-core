import { CartArgsType, CartType } from "@core/types";
import { fetchCartLineItemProducts, viewCart } from "@services/cartService";

export const resolverQuries = {
  Query: {
    cart: async (_: unknown, args: CartArgsType) => await viewCart(args),
  },
  Cart: {
    lines: async (parent: CartType) => await fetchCartLineItemProducts(parent),
  },
};
