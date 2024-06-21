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

  type WarehouseStatusChangeResponse {
    success: Boolean
    status: Boolean
  }

  type WarehouseList {
    warehouses: [Warehouse]
    pageInfo: WarehousePageInfo
  }

  type WarehousePageInfo {
    isStart: Boolean
    isEnd: Boolean
    totalPages: Int
    totalMatches: Int
    currentMatchs: Int
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

  input WarehouseListInput {
    search: String
    page: Int
    size: Int
    sortBy: String
    sortDirection: String
    active: String
  }
`;
