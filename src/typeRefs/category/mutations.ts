import { gql } from "apollo-server-express";

export const categoryMutations = gql`
  type Mutation {
    categoryCreate(categoryCreateInput: CategoryCreateInput!): Category
  }
`;
