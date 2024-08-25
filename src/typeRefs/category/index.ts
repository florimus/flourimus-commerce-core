import { gql } from "apollo-server-express";
import { CategoryDefs } from "./types";
import { categoryMutations } from "./mutations";
import { CategoryQuries } from "./quries";

export default function categoryRefs() {
  const typeDefs = gql`
    ${CategoryDefs}
    ${CategoryQuries}
    ${categoryMutations}
  `;

  return {
    typeDefs,
  };
}
