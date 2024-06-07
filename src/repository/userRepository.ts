import { UserType } from "@types";
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
}

export const updateUser = async (_id: string, data: Partial<UserType>) => {  
  await User.updateOne({ _id }, data);
  return await User.findOne({ _id }) as UserType
}
