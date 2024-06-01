import { TokenPayloadType } from "@core/types";
import { decodeToken } from "@core/utils/jwtUtils";

export const verifyAuthenticationToken = (token: string) => {
  const tokenData: TokenPayloadType = decodeToken(token);
  if (
    tokenData.type === "anonymous-access" ||
    tokenData.type === "register-access"
  ) {
    return tokenData._id;
  }
  return "";
};
