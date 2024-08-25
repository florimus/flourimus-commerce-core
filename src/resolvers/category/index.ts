import { resolverMutations } from "./mutations";
import { mutationPermissions, quriesPermissions } from "./permissions";
import { resolverQuries } from "./quries";

export default function categoryResolvers() {
  return {
    ...resolverQuries,
    ...resolverMutations
  }
}

export const categoryPermissions = {
  quries: quriesPermissions,
  mutations: mutationPermissions
}
