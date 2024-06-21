import mongoose from "mongoose";
import commonFieldsSchema from "./CommonSchema";

const Schema = mongoose.Schema;

const productPriceSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  listPrice: {
    type: Number,
    required: true,
  },
  sellPrice: {
    type: Number,
    required: true,
  },
  taxId: {
    type: String,
  },
}, { _id: false });

export const priceTableSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  prices: {
    type: [productPriceSchema],
  },
});

priceTableSchema.add(commonFieldsSchema);

const PriceTable = mongoose.model("prices", priceTableSchema);

export default PriceTable;
