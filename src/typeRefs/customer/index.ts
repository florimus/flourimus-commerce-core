import { gql } from "apollo-server-express";
import { UserQuries } from "./quries";
import { UserDefs } from "./types";

export default function cutomerTypeRefs() {
  const typeDefs = gql`
    ${UserQuries}
    ${UserDefs}
  `;

  return {
    typeDefs
  }
}