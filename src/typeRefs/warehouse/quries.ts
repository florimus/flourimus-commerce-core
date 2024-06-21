import { gql } from "apollo-server-express";

export const WarehouseQuries = gql`
  type Query {
    warehouseList(warehouseListInput: WarehouseListInput): WarehouseList
  }
`;
