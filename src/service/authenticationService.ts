import { TokenPayloadType } from "@core/types";
import { decodeToken } from "@core/utils/jwtUtils";
import UnAuthorizationError from "@errors/UnAuthorizationError";

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

export const verifyRefreshToken = (token: string) => {
  const tokenData: TokenPayloadType = decodeToken(token);
  if (
    tokenData.type === "anonymous-refresh" ||
    tokenData.type === "register-refresh"
  ) {
    return tokenData;
  }
  throw new UnAuthorizationError("Invalid refresh token")
}
