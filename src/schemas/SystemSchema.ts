import mongoose from "mongoose";
import commonFieldsSchema from "./CommonSchema";

const Schema = mongoose.Schema;

export const systemSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true
  },
  defaultConfigurations: {
    type: Schema.Types.Mixed,
    required: true
  },
  channelConfigurations: {
    type: Schema.Types.Mixed
  }
});

systemSchema.add(commonFieldsSchema);

const System = mongoose.model('systems', systemSchema);

export default System;
