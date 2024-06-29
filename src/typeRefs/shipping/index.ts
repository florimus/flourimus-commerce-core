import { gql } from "apollo-server-express";
import { ShippingDefs } from "./types";
import { ShippingMutations } from "./mutations";
import { WarehouseQuries } from "./quries";

export default function shippingRefs() {
  const typeDefs = gql`
    ${ShippingDefs}
    ${WarehouseQuries}
    ${ShippingMutations}
  `;

  return {
    typeDefs,
  };
}
