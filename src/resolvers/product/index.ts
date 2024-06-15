import { quriesPermissions } from "./permissions";
import { resolverQuries } from "./quries";

export default function productResolvers() {
  return {
    ...resolverQuries,
  }
}

export const productPermissions = {
  quries: quriesPermissions,
}
