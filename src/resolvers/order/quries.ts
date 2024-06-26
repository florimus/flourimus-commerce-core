import { CartArgsType, CartType, OrderArgsType } from "@core/types";
import {
  calucateCartPrice,
  fetchCartLineItemProducts,
  viewCart,
  viewOrder,
} from "@services/cartService";

export const resolverQuries = {
  Query: {
    cart: async (_: unknown, args: CartArgsType) => await viewCart(args),
    order: async (_: unknown, args: OrderArgsType) => await viewOrder(args),
  },
  Cart: {
    lines: async (parent: CartType) => await fetchCartLineItemProducts(parent),
    price: async (parent: CartType) => await calucateCartPrice(parent),
  },
  Order: {
    lines: async (parent: CartType) => await fetchCartLineItemProducts(parent),
    price: async (parent: CartType) => await calucateCartPrice(parent),
  },
};
