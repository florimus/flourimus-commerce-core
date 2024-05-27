/* eslint-disable */
import { ContextObjectType } from "@types";

export default async function safeRoute(
  qualifier: string,
  context: ContextObjectType["permissons"],
  service: (...args: any) => any,
  ...args: any
) {
  return await service(...args)
}
