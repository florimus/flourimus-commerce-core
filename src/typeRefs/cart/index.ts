import { gql } from "apollo-server-express";
import { CartDefs } from "./types";
import { CartMutations } from "./mutations";
import { CartQuries } from "./quries";

export default function cartRefs() {
  const typeDefs = gql`
    ${CartDefs}
    ${CartQuries}
    ${CartMutations}
  `;

  return {
    typeDefs,
  };
}
