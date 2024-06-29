import mongoose from "mongoose";
import commonFieldsSchema from "./CommonSchema";

const Schema = mongoose.Schema;

const ShippingMethodPrice = new Schema({
  minPrice: {
    type: Number,
    required: true,
  },
  maxPrice: {
    type: Number,
    required: true,
  },
}, { _id: false });

const ShippingMethodWeight = new Schema({
  minWeight: {
    type: Number,
    required: true,
  },
  maxWeight: {
    type: Number,
    required: true,
  },
}, { _id: false });

const ShippingMethodQuantity = new Schema({
  minQuantity: {
    type: Number,
    required: true,
  },
  maxQuantity: {
    type: Number,
    required: true,
  },
}, { _id: false });

export const shippingSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  country: {
    type: [String],
  },
  state: {
    type: [String],
  },
  allCountry: {
    type: Boolean,
    required: true,
  },
  allStates: {
    type: Boolean,
    required: true,
  },
  sellPrice: {
    type: Number,
    required: true,
  },
  listPrice: {
    type: Number,
    required: true,
  },
  priceConfig: {
    type: ShippingMethodPrice,
  },
  weightConfig: {
    type: ShippingMethodWeight,
  },
  quantityConfig: {
    type: ShippingMethodQuantity,
  },
  enabledPriceLimits: {
    type: Boolean,
    required: true,
  },
  enabledWeightLimits: {
    type: Boolean,
    required: true,
  },
  enabledQuantityLimits: {
    type: Boolean,
    required: true,
  },
  isDefault: {
    type: Boolean,
  },
});

shippingSchema.add(commonFieldsSchema);

const Shipping = mongoose.model("shippings", shippingSchema);

export default Shipping;
