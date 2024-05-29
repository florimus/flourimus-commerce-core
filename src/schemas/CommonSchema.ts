const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commonFieldsSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: false },
  createdBy: { typeof: String },
  updatedBy: { typeof: String },
  metaStatus: { type: String }
}, { _id: false });

export default commonFieldsSchema;
