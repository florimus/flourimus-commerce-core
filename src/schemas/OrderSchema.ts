import mongoose from "mongoose";
import commonFieldsSchema from "./CommonSchema";

const Schema = mongoose.Schema;

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
});

orderSchema.add(commonFieldsSchema);

const Cart = mongoose.model("orders", orderSchema);

export default Cart;
