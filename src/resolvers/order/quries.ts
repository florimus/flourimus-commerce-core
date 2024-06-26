import {
  CartArgsType,
  CartType,
  ContextObjectType,
  OrderArgsType,
  OrderListArgsType,
} from "@core/types";
import {
  calucateCartPrice,
  fetchCartLineItemProducts,
  viewCart,
  viewOrder,
  viewOrders,
} from "@services/cartService";

export const resolverQuries = {
  Query: {
    cart: async (_: unknown, args: CartArgsType) => await viewCart(args),

    order: async (
      _: unknown,
      args: OrderArgsType,
      context: ContextObjectType
    ) => await viewOrder(args, context),

    orders: async (
      _: unknown,
      args: OrderListArgsType,
      context: ContextObjectType
    ) => await viewOrders(args, context),
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
