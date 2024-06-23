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

export const orderSchema = new Schema({
  _id: {
    type: String,
    required: true,
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
    enum: ["CREATED", "PAYMENT_DECLINED", "ORDER"],
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
});

orderSchema.add(commonFieldsSchema);

const Cart = mongoose.model("orders", orderSchema);

export default Cart;
