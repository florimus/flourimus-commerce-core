import { gql } from "apollo-server-express";

export const categoryMutations = gql`
  type Mutation {
    categoryCreate(categoryCreateInput: CategoryCreateInput!): Category
    categoryUpdate(categoryUpdateInput: CategoryUpdateInput!): Category
    categoryStatusChange(_id: ID!): CategoryStatusChangeResponse
  }
`;
