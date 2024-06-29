import { gql } from "apollo-server-express";
import { ShippingDefs } from "./types";
import { ShippingMutations } from "./mutations";
import { ShippingQuries } from "./quries";

export default function shippingRefs() {
  const typeDefs = gql`
    ${ShippingDefs}
    ${ShippingQuries}
    ${ShippingMutations}
  `;

  return {
    typeDefs,
  };
}
