import User from "src/schemas/UserSchema";

export const getUserByIdOrEmail = async (
  _id: string,
  email: string,
  isActive?: boolean
) => {
  if (isActive) {
    return await User.findOne({ $or: [{ _id }, { email }], isActive });
  }
  return await User.findOne({ $or: [{ _id }, { email }] });
};
