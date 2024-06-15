import { gql } from "apollo-server-express";
import { ProductQuries } from "./quries";
import { ProductDefs } from "./types";

export default function productRefs() {
  const typeDefs = gql`
    ${ProductQuries}
    ${ProductDefs}
  `;

  return {
    typeDefs
  }
}