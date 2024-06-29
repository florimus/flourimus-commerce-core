import { gql } from "apollo-server-express";

export const ShippingDefs = gql`
  type ShippingMethods {
    _id: ID
    name: String
    country: [String]
    state: [String]
    allCountry: Boolean
    allStates: Boolean
    sellPrice: Int
    listPrice: Int
    priceConfig: ShippingMethodPriceLimits
    weightConfig: ShippingMethodWeightLimits
    quantityConfig: ShippingMethodQuantityLimits
    enabledPriceLimits: Boolean
    enabledWeightLimits: Boolean
    enabledQuantityLimits: Boolean
    createdAt: String
    updatedAt: String
    isActive: Boolean
    createdBy: String
    updatedBy: String
    metaStatus: String
  }

  type ShippingMethodPriceLimits {
    minPrice: Int
    maxPrice: Int
  }

  type ShippingMethodWeightLimits {
    minWeight: Int
    maxWeight: Int
  }

  type ShippingMethodQuantityLimits {
    minQuantity: Int
    maxQuantity: Int
  }

  type ShippingsList {
    shippings: [ShippingMethods]
    pageInfo: ShippingsPageInfo
  }

  type ShippingsPageInfo {
    isStart: Boolean
    isEnd: Boolean
    totalPages: Int
    totalMatches: Int
    currentMatchs: Int
  }

  # =============== Inputs =================
  input ShippingMethodCreateInput {
    name: String
    country: [String]
    state: [String]
    allCountry: Boolean
    allStates: Boolean
    sellPrice: Int
    listPrice: Int
    priceConfig: ShippingMethodPriceLimitsInput
    weightConfig: ShippingMethodWeightLimitsInput
    quantityConfig: ShippingMethodQuantityLimitsInput
    enabledPriceLimits: Boolean
    enabledWeightLimits: Boolean
    enabledQuantityLimits: Boolean
  }

  input ShippingMethodUpdateInput {
    name: String
    country: [String]
    state: [String]
    allCountry: Boolean
    allStates: Boolean
    sellPrice: Int
    listPrice: Int
    priceConfig: ShippingMethodPriceLimitsInput
    weightConfig: ShippingMethodWeightLimitsInput
    quantityConfig: ShippingMethodQuantityLimitsInput
    enabledPriceLimits: Boolean
    enabledWeightLimits: Boolean
    enabledQuantityLimits: Boolean
  }

  input ShippingMethodPriceLimitsInput {
    minPrice: Int
    maxPrice: Int
  }

  input ShippingMethodWeightLimitsInput {
    minWeight: Int
    maxWeight: Int
  }

  input ShippingMethodQuantityLimitsInput {
    minQuantity: Int
    maxQuantity: Int
  }

  input ShippingsListInput {
    search: String
    page: Int
    size: Int
  }
`;
