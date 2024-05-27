import { Request } from "express";
import UnAuthorizationError from "@errors/UnAuthorizationError";
import { ContextObjectType } from "@types";

export default async function authenticationFilter({ req }: { req: Request }):Promise<ContextObjectType> {
  const { headers } = req || {};

  const { authorization } = headers || {}

  // TODO: auth logic

  if (authorization) {
    return { isAuthenticated: true, permissons: ["U1", "U2", "U3"] };
  }
  throw new UnAuthorizationError("User token not found");
}