import { resolverMutations } from "./mutations";
import { mutationPermissions, quriesPermissions } from "./permissions";
import { resolverQuries } from "./quries";

export default function shippingResolvers() {
  return {
    ...resolverQuries,
    ...resolverMutations,
  };
}

export const shippingPermissions = {
  quries: quriesPermissions,
  mutations: mutationPermissions,
};
