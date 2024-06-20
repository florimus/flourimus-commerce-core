import { gql } from "apollo-server-express";
import { ProductQuries } from "./quries";
import { ProductDefs } from "./types";
import { ProductMutations } from "./mutations";
import { ProductSubscriptions } from "./subscriptions";

export default function productRefs() {
  const typeDefs = gql`
    ${ProductQuries}
    ${ProductDefs}
    ${ProductMutations}
    ${ProductSubscriptions}
  `;

  return {
    typeDefs,
  };
}
