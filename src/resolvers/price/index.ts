import { resolverMutations } from "./mutations";
import { mutationPermissions } from "./permissions";

export default function priceTableResolvers() {
  return {
    ...resolverMutations,
  };
}

export const priceTablePermissions = {
  mutations: mutationPermissions,
};
