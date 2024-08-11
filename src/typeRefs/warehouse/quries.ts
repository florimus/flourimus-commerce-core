import { gql } from "apollo-server-express";

export const WarehouseQuries = gql`
  type Query {
    warehouse(_id: ID!): Warehouse
    warehouseList(warehouseListInput: WarehouseListInput): WarehouseList
    warehousesWithProduct(productId: String!): [Warehouse] 
  }
`;
