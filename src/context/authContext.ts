import { Request } from "express";
import { ContextObjectType } from "@types";

export default async function userContext({ req }: { req: Request }): Promise<ContextObjectType> {
  const { headers } = req || {};

  const { authorization } = headers || {}

  if (authorization) {
    // User fetch  logic
    return { name: "username", permissons: ["U1", "U2", "U3"] };
  }
  return {} as ContextObjectType;
}