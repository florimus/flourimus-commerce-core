import { resolverMutations } from "./mutations";
import { mutationPermissions, quriesPermissions } from "./permissions";
import { resolverQuries } from "./quries";

export default function customerResolvers() {
  return {
    ...resolverQuries,
    ...resolverMutations
  }
}

export const customerPermissions = {
  quries: quriesPermissions,
  mutations: mutationPermissions
}
