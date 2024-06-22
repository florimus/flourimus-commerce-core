import { resolverMutations } from "./mutations";
import { mutationPermissions } from "./permissions";

export default function cartResolvers() {
  return {
    ...resolverMutations,
  };
}

export const cartPermissions = {
  // quries: quriesPermissions,
  mutations: mutationPermissions,
};
