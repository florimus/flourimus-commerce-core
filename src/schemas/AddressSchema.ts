import mongoose from "mongoose";
import commonFieldsSchema from "./CommonSchema";

const Schema = mongoose.Schema;

export const addressSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
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
  isDefault: {
    type: Boolean,
  },
});

addressSchema.add(commonFieldsSchema);

const Address = mongoose.model("addresses", addressSchema);

export default Address;
