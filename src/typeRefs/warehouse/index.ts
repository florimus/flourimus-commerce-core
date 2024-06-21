import { gql } from "apollo-server-express";
import { WarehouseDefs } from "./types";
import { WarehouseMutations } from "./mutations";

export default function warehouseRefs() {
  const typeDefs = gql`
    ${WarehouseDefs}
    ${WarehouseMutations}
  `;

  return {
    typeDefs,
  };
}
