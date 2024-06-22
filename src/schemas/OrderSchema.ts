import mongoose from "mongoose";
import commonFieldsSchema from "./CommonSchema";

const Schema = mongoose.Schema;

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
    type: [String],
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
