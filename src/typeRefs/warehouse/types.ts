import { gql } from "apollo-server-express";

export const WarehouseDefs = gql`
  type Warehouse {
    _id: ID
    name: String
    stocks: [ProductStocks]
    country: String
    createdAt: String
    updatedAt: String
    isActive: Boolean
    createdBy: String
    updatedBy: String
    metaStatus: String
  }

  type ProductStocks {
    productId: String
    totalStocks: Float
    saftyStock: Float
    allocatedStocks: Float
  }

  # =============== Inputs =================

  input ProductStockEntryInput {
    warehouseId: String
    productId: String
    totalStocks: Float
    saftyStock: Float
  }

  input WarehouseCreateInput {
    name: String
    country: String
  }
`;
