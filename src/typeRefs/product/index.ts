import { gql } from "apollo-server-express";
import { ProductQuries } from "./quries";
import { ProductDefs } from "./types";
import { ProductMutations } from "./mutations";

export default function productRefs() {
  const typeDefs = gql`
    ${ProductQuries}
    ${ProductDefs}
    ${ProductMutations}
  `;

  return {
    typeDefs
  }
}