import { resolverMutations } from "./mutations";
import { mutationPermissions, quriesPermissions } from "./permissions";
import { resolverQuries } from "./quries";

export default function warehouseResolvers() {
  return {
    ...resolverQuries,
    ...resolverMutations,
  };
}

export const warehousePermissions = {
  quries: quriesPermissions,
  mutations: mutationPermissions,
};
