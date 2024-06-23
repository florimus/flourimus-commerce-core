import { gql } from "apollo-server-express";
import { OrderDefs } from "./types";
import { OrderMutations } from "./mutations";
import { OrderQuries } from "./quries";

export default function orderRefs() {
  const typeDefs = gql`
    ${OrderDefs}
    ${OrderQuries}
    ${OrderMutations}
  `;

  return {
    typeDefs,
  };
}
