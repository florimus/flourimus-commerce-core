import { resolverMutations } from "./mutations";
import { mutationPermissions, quriesPermissions } from "./permissions";
import { resolverQuries } from "./quries";

export default function productResolvers() {
  return {
    ...resolverQuries,
    ...resolverMutations
  }
}

export const productPermissions = {
  quries: quriesPermissions,
  mutations: mutationPermissions
}
