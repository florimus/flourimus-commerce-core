import { resolverMutations } from "./mutations";
import { mutationPermissions, quriesPermissions } from "./permissions";
import { resolverQuries } from "./quries";

export default function orderResolvers() {
  return {
    ...resolverMutations,
    ...resolverQuries,
  };
}

export const orderPermissions = {
  quries: quriesPermissions,
  mutations: mutationPermissions,
};
