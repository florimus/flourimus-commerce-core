import mongoose from "mongoose";
import commonFieldsSchema from "./CommonSchema";

const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    point: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pin: {
      type: Number,
      required: true,
    },
    landmark: {
      type: String,
    },
  },
  { _id: false }
);

export const lineItemSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    adjustments: {
      type: String,
    },
  },
  { _id: false }
);

export const priceSchema = new Schema(
  {
    gross: {
      type: Number,
      required: true,
    },
    net: {
      type: Number,
      required: true,
    },
    discounts: {
      type: Number,
    },
    tax: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
  { _id: false }
);

export const orderPriceSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    unit: {
      type: priceSchema,
      required: true,
    },
    order: {
      type: priceSchema,
      required: true,
    },
  },
  { _id: false }
);

export const orderDetailsSchema = new Schema(
  {
    paymentMethod: {
      type: ["cod", "card"],
      required: true,
    },
    cardName: {
      type: String,
    },
    lastDigits: {
      type: String,
    },
  },
  { _id: false }
);

export const orderSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  orderId: {
    type: String,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  lines: {
    type: [lineItemSchema],
  },
  status: {
    type: String,
    enum: ["CREATED", "PAYMENT_INITIATED", "PAYMENT_DECLINED", "ORDER"],
  },
  isAnonymous: {
    type: Boolean,
    required: true,
  },
  shippingAddress: {
    type: addressSchema,
  },
  billingAddress: {
    type: addressSchema,
  },
  sessionId: {
    type: String,
  },
  orderItemsPrices: {
    type: [orderPriceSchema],
  },
  ordrPrice: {
    type: priceSchema,
  },
  orderDetails: {
    type: orderDetailsSchema,
  },
});

orderSchema.add(commonFieldsSchema);

const Cart = mongoose.model("orders", orderSchema);

export default Cart;
