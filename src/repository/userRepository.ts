import Address from "@schemas/AddressSchema";
import { AddressType, UserType } from "@types";
import User from "src/schemas/UserSchema";

export const getUserByIdOrEmail = async (
  _id: string,
  email: string,
  isActive?: boolean
) => {
  if (isActive) {
    return (await User.findOne({
      $or: [{ _id }, { email }],
      isActive,
    })) as UserType;
  }
  return (await User.findOne({ $or: [{ _id }, { email }] })) as UserType;
};

export const createUser = async (user: UserType) => {
  return await new User(user).save();
};

export const updateUser = async (_id: string, data: Partial<UserType>) => {
  await User.updateOne({ _id }, data);
  return (await User.findOne({ _id })) as UserType;
};

const createCustomerAddress = async (address: AddressType) => {
  return await new Address(address).save();
};

const getCustomerAddress = async (userId: string) => {
  return (await Address.find({ userId })) as AddressType[];
};

const getCustomerAddressById = async (_id: string) => {
  return (await Address.findOne({ _id })) as AddressType;
};

const setDefaultAddressById = async (
  userId: string,
  _id: string,
  addressUpdate: Partial<AddressType>
) => {
  await Address.updateMany({ userId }, { $set: { isDefault: false } });
  return (await Address.findOneAndUpdate(
    { _id, userId },
    { $set: addressUpdate },
    { new: true }
  )) as AddressType;
};

export const updateAddress = async (_id: string, data: Partial<AddressType>) => {
  return (await Address.findOneAndUpdate(
    { _id },
    { $set: data },
    { new: true }
  )) as AddressType;
};

export default {
  createCustomerAddress,
  getCustomerAddress,
  getCustomerAddressById,
  setDefaultAddressById,
  updateAddress,
};
