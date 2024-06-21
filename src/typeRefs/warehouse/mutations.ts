import { gql } from "apollo-server-express";

export const WarehouseMutations = gql`
  type Mutation {
    productStockEntry(
      productStockEntryInput: ProductStockEntryInput!
    ): ProductStocks

    warehouseCreate(warehouseCreateInput: WarehouseCreateInput!): Warehouse

    warehouseStatusChange(_id: ID!): WarehouseStatusChangeResponse
  }
`;
