import { resolverMutations } from "./mutations";
import { mutationPermissions, quriesPermissions } from "./permissions";
import { resolverQuries } from "./quries";

export default function cartResolvers() {
  return {
    ...resolverMutations,
    ...resolverQuries,
  };
}

export const cartPermissions = {
  quries: quriesPermissions,
  mutations: mutationPermissions,
};
