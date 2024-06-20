import { resolverMutations } from "./mutations";
import { mutationPermissions, quriesPermissions } from "./permissions";
import { resolverQuries } from "./quries";
import { resolverSubscriptions } from "./subscriptions";

export default function productResolvers() {
  return {
    ...resolverQuries,
    ...resolverMutations,
    ...resolverSubscriptions
  }
}

export const productPermissions = {
  quries: quriesPermissions,
  mutations: mutationPermissions
}
