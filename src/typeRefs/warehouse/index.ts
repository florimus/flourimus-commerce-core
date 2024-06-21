import { gql } from "apollo-server-express";
import { WarehouseDefs } from "./types";
import { WarehouseMutations } from "./mutations";
import { WarehouseQuries } from "./quries";

export default function warehouseRefs() {
  const typeDefs = gql`
    ${WarehouseDefs}
    ${WarehouseQuries}
    ${WarehouseMutations}
  `;

  return {
    typeDefs,
  };
}
