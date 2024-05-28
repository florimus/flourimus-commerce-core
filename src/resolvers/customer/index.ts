import { permissions } from "./permissions";
import { resolverQuries } from "./quries";

export default function customerResolvers() {
  return {
    ...resolverQuries
  }
}

export const customerPermissions = permissions
