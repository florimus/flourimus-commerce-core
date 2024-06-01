import bcrypt from "bcrypt";

export const hashPassword: (password: string) => Promise<string> = async (
  password
) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePasswords: (
  plainPassword: string,
  hashedPassword: string
) => Promise<boolean> = async (plainPassword, hashedPassword) => {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
};