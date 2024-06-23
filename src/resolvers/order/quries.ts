import { CartArgsType, CartType } from "@core/types";
import {
  calucateCartPrice,
  fetchCartLineItemProducts,
  viewCart,
} from "@services/cartService";

export const resolverQuries = {
  Query: {
    cart: async (_: unknown, args: CartArgsType) => await viewCart(args),
  },
  Cart: {
    lines: async (parent: CartType) => await fetchCartLineItemProducts(parent),
    price: async (parent: CartType) => await calucateCartPrice(parent),
  },
};
