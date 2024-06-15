import { getCurrentTime } from "@core/utils/timeUtils";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commonFieldsSchema = new Schema({
  createdAt: { type: String, default: getCurrentTime() },
  updatedAt: { type: String, default: getCurrentTime() },
  isActive: { type: Boolean, default: false },
  createdBy: { type: String },
  updatedBy: { type: String, default: getCurrentTime() },
  metaStatus: { type: String, default: getCurrentTime() }
}, { _id: false });

export default commonFieldsSchema;
