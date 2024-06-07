import mongoose from "mongoose";
import commonFieldsSchema from "./CommonSchema";
import roles from "src/core/roles";

const Schema = mongoose.Schema;

const phoneSchema = new Schema({
  dialCode: {
    type: String,
    required: true,
    match: /^\+\d{1,3}$/
  },
  number: {
    type: String,
    required: true,
    match: /^\d+$/
  }
}, { _id: false });

export const userSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: phoneSchema
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: roles.CUSTOMER
  },
  loginType: {
    type: String,
    enum: ["password", "google"]
  },
  lastOnline: {
    type: String
  },
  token: {
    type: String
  }
});

userSchema.add(commonFieldsSchema);

const User = mongoose.model("users", userSchema);

export default User;
