import { rule } from "graphql-shield";

export const isAuthenticated = rule()(async (parent, args, context) => {
  return true;
});

export const hasRole = (role: string) =>
  rule()(async (parent, args, context) => {
    return true;
  });
