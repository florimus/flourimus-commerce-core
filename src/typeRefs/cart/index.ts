import { gql } from "apollo-server-express";
import { CartDefs } from "./types";
import { CartMutations } from "./mutations";

export default function cartRefs() {
  const typeDefs = gql`
    ${CartDefs}
    ${CartMutations}
  `;

  return {
    typeDefs,
  };
}
