import { UserType } from "@types";
import jwt, { SignOptions } from "jsonwebtoken";
import constants from "@core/constants/contants";

const secret = process.env.TOKEN_SECRET!;
type TokenType =
  | "register-access"
  | "register-refresh"
  | "anonymous-access"
  | "anonymous-refresh";

const anonymous_access_token_options = {
  expiresIn: "1h",
  algorithm: "HS256",
} as const;

const anonymous_refresh_token_options = {
  expiresIn: "3h",
  algorithm: "HS256",
} as const;

const register_refresh_token_options = {
  expiresIn: "3h",
  algorithm: "HS256",
} as const;

const register_access_token_options = {
  expiresIn: "6h",
  algorithm: "HS256",
} as const;

const gettokenOptions: (type: TokenType) => {
  expiresIn: string;
  algorithm: string;
} = (type) => {
  switch (type) {
    case "register-access":
      return register_access_token_options;
    case "register-refresh":
      return register_refresh_token_options;
    case "anonymous-access":
      return anonymous_access_token_options;
    case "anonymous-refresh":
      return anonymous_refresh_token_options;
  }
};

const populateToken = (
  payload: Partial<UserType> & { type: string },
  tokenType: TokenType
) => {
  const tokenOptions = gettokenOptions(tokenType);
  return jwt.sign(payload, secret, tokenOptions as SignOptions);
};

export const createUserToken = (user: UserType, userTokenType: string) => {
  const accessToken = populateToken(
    {
      _id: user._id,
      email: user.email,
      loginType: user.loginType,
      firstName: user.firstName,
      lastName: user.lastName,
      lastOnline: user.lastOnline,
      role: user.role,
      type: userTokenType,
    },
    `${userTokenType}-${constants.tokenConstants.ACCESS_TOKEN}` as TokenType
  );

  const refreshToken = populateToken(
    {
      _id: user._id,
      email: user.email,
      loginType: user.loginType,
      type: userTokenType,
    },
    `${userTokenType}-${constants.tokenConstants.REFRESH_TOKEN}` as TokenType
  );

  return {
    access: accessToken,
    refresh: refreshToken,
  };
};
