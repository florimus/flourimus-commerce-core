import mongoose from "mongoose";
import commonFieldsSchema from "./CommonSchema";

const Schema = mongoose.Schema;

const productStockSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    totalStocks: {
      type: Number,
      required: true,
    },
    saftyStock: {
      type: Number,
      required: true,
    },
    allocatedStocks: {
      type: Number,
    },
  },
  { _id: false }
);

export const warehouseSchema = new Schema({
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
    type: String,
    required: true,
  },
  stocks: {
    type: [productStockSchema],
  },
});

warehouseSchema.add(commonFieldsSchema);

const Warehouse = mongoose.model("warehouses", warehouseSchema);

export default Warehouse;
