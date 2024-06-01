import { gql } from "apollo-server-express";
import { UserQuries } from "./quries";
import { UserDefs } from "./types";
import { UserMutations } from "./mutations";

export default function cutomerTypeRefs() {
  const typeDefs = gql`
    ${UserQuries}
    ${UserMutations}
    ${UserDefs}
  `;

  return {
    typeDefs
  }
}