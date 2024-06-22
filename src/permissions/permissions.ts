import { ContextObjectType } from "@types";
import { rule } from "graphql-shield";

export const isAuthenticated = rule()(
  async (_parent: unknown, _args: unknown, context: ContextObjectType) => {
    return Boolean(context.email && context.isActive);
  }
);

export const anyUser = rule()(
  async (_parent: unknown, _args: unknown, context: ContextObjectType) => {
    return Boolean(context._id );
  }
);

export const hasRole = (role: string) =>
  rule()(async (_parent: unknown, _args: unknown, context: ContextObjectType) => {
    const { permissions } = context || {}
    return Boolean(Array.isArray(permissions) && permissions.includes(role))
  });
