import { gql } from "apollo-server-express";

export const WarehouseMutations = gql`
  type Mutation {
    productStockEntry(
      productStockEntryInput: ProductStockEntryInput!
    ): ProductStocks

    WarehouseCreate(warehouseCreateInput: WarehouseCreateInput!): Warehouse
  }
`;
