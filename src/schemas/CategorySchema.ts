import mongoose from "mongoose";
import commonFieldsSchema from "./CommonSchema";

const Schema = mongoose.Schema;

export const categorySchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  parentId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  medias: {
    type: [String],
  },
  productIds: {
    type: [String],
  },
  subCategoryIds: {
    type: [String],
  },
});

categorySchema.add(commonFieldsSchema);

const Category = mongoose.model("categories", categorySchema);

export default Category;
