import { gql } from "apollo-server-express";
import { ProductTableDefs } from "./types";
import { PriceTableMutations } from "./mutations";

export default function priceTableRefs() {
  const typeDefs = gql`
    ${ProductTableDefs}
    ${PriceTableMutations}
  `;

  return {
    typeDefs,
  };
}
