import { resolverMutations } from "./mutations";
import { mutationPermissions } from "./permissions";

export default function warehouseResolvers() {
  return {
    ...resolverMutations,
  };
}

export const warehousePermissions = {
  mutations: mutationPermissions,
};
