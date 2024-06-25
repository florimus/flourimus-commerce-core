import mongoose from "mongoose";
import commonFieldsSchema from "./CommonSchema";

const Schema = mongoose.Schema;

export const productSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  isCodAvailable: {
    type: Boolean,
    required: true,
    default: false,
  },
  medias: {
    type: [String],
  },
  parentId: {
    type: String,
  },
  category: {
    type: String,
  },
  brand: {
    type: String,
  },
  isVariant: {
    type: Boolean,
    default: false,
  },
  haveVariants: {
    type: Boolean,
    default: false,
  },
  isSellable: {
    type: Boolean,
    default: true,
  },
  variantInfo: {
    type: [String],
    default: [],
  },
});

productSchema.add(commonFieldsSchema);

const Product = mongoose.model("products", productSchema);

export default Product;
