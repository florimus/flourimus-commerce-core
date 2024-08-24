/* eslint-disable */

import { PubSub } from "graphql-subscriptions";
import { FileUpload } from "graphql-upload-ts";

/**
 * Define all types here
 */
export interface ContextObjectType extends UserType {
  permissions: string[];
  pubsub: PubSub;
  isAnonymous: boolean;
}

export type UserQueryArgsType = {
  _id: string;
  email: string;
};

export type VerifyInvitationQueryArgsType = {
  token: string;
};

export type TokenQueryArgsType = {
  tokenRequestInput: {
    email?: string;
    password?: string;
    grandType?: "password" | "google" | "anonymous";
    externalToken?: string;
  };
};

export type RefreshQueryArgsType = {
  token: string;
};

export type AddressQueryArgsType = {
  _id: string;
};

export type InviteStaffMutationArgsType = {
  inviteStaffInput: {
    email: string;
    role: string;
    firstName: string;
    lastName: string;
  };
};

export type CategoryCreateMutationArgsType = {
  categoryCreateInput: {
    name: string;
    description: string;
    medias: string[];
    productIds: string[];
  };
};

export type OnboardStaffMutationArgsType = {
  onboardStaffInput: {
    _id: string;
    firstName: string;
    lastName: string;
    password: string;
    loginType: string;
    token: string;
  };
};

export type ForgotPasswordMutationArgsType = {
  email: string;
};

export type ResetPasswordMutationArgsType = {
  resetPasswordInput: {
    token: string;
    password: string;
  };
};

export type ProductArgsType = {
  _id: string;
};

export type ProductBulkUploadArgs = {
  file: {
    file: Promise<FileUpload>;
  };
};

export type ProductListArgsType = {
  productListInput: {
    search: string;
    page: number;
    size: number;
    sortBy: string;
    sortDirection: "ASC" | "DESC";
    active: "ACTIVE" | "INACTIVE" | "ALL";
    type: "product" | "variant" | "all";
  };
};

export type OrderListArgsType = {
  orderListInput: {
    search: string;
    page: number;
    size: number;
    sortBy: string;
    sortDirection: "ASC" | "DESC";
    status: "ORDER";
    userId: string;
  };
};

export type AddressCreateArgsType = {
  createAddressInput: {
    point: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pin: number;
    landmark: string;
  };
};

export type AddressUpdateArgsType = {
  _id: string;
  updateAdressInput: {
    point: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pin: number;
    landmark: string;
  };
};

export type WarehouseListArgsType = {
  warehouseListInput: {
    search: string;
    page: number;
    size: number;
    sortBy: string;
    sortDirection: "ASC" | "DESC";
    active: "ACTIVE" | "INACTIVE" | "ALL";
  };
};

export type WarehousesWithProductArgsType = {
  productId: string;
};

export type WarehouseStockListArgsType = {
  stockListInput: {
    search: string;
    page: number;
    size: number;
  };
};

export type WarehouseArgsType = {
  _id: string;
};

export type ShippingMethodArgsType = {
  _id: string;
};

export type ShippingMethodListArgsType = {
  shippingsListInput: {
    search: string;
    page: number;
    size: number;
  };
};

export type CreateProductArgsType = {
  productCreateInput: {
    name: string;
    shortDescription?: string;
    description?: string;
    parentId: string;
    category: string;
    brand: string;
    isVariant: boolean;
    medias: string[];
    isSellable: boolean;
    isCodAvailable: boolean;
  };
};

export type ProductPriceEntryArgsType = {
  productPriceEntryInput: {
    productId: string;
    listPrice: number;
    sellPrice: number;
    taxId: string;
  };
};

export type WarehouseCreateArgsType = {
  warehouseCreateInput: {
    name: string;
    country: string;
  };
};

export type UpdateProductArgsType = {
  _id: string;
  productUpdateInput: {
    name?: string;
    medias?: string[];
    shortDescription?: string;
    description?: string;
    category?: string;
    brand?: string;
    isSellable?: boolean;
    isCodAvailable?: boolean;
  };
};

export type ChangeWarehouseStatusArgsType = {
  _id: string;
};

export type StockEntryArgsType = {
  productStockEntryInput: {
    warehouseId: string;
    productId: string;
    totalStocks: number;
    saftyStock: number;
  };
};

export type CartItemAddArgsType = {
  addToCartInput: {
    lineIds: string[];
  };
};

export type CartItemRemoveArgsType = {
  productId: string[];
};

export type CartAddressArgsType = {
  shipping: CartAddressesType;
  billing: CartAddressesType;
  isSameAsBilling: boolean;
};

export type SubmitOrderArgsType = {
  sessionId: string;
};

export type InitiateOrderArgsType = {
  method: "cod" | "online";
};

export type CartArgsType = {
  _id: string;
};

export type OrderArgsType = {
  orderId: string;
};

export type ShippingMethodPriceLimits = {
  minPrice: number;
  maxPrice: number;
};

export type ShippingMethodWeightLimits = {
  minWeight: number;
  maxWeight: number;
};

export type ShippingMethodQuantityLimits = {
  minQuantity: number;
  maxQuantity: number;
};

export type ShippingMethodCreateArgsType = {
  shippingMethodCreateInput: {
    enabledPriceLimits: boolean;
    enabledWeightLimits: boolean;
    enabledQuantityLimits: boolean;
    name: string;
    country: string[];
    state: string[];
    allCountry: false;
    allStates: false;
    sellPrice: number;
    listPrice: number;
    priceConfig: ShippingMethodPriceLimits;
    weightConfig: ShippingMethodWeightLimits;
    quantityConfig: ShippingMethodQuantityLimits;
  };
};

export type ShippingMethodUpdateArgsType = {
  _id: string;
  shippingMethodUpdateInput: {
    enabledPriceLimits: boolean;
    enabledWeightLimits: boolean;
    enabledQuantityLimits: boolean;
    name: string;
    country: string[];
    state: string[];
    allCountry: false;
    allStates: false;
    sellPrice: number;
    listPrice: number;
    priceConfig: ShippingMethodPriceLimits;
    weightConfig: ShippingMethodWeightLimits;
    quantityConfig: ShippingMethodQuantityLimits;
  };
};

export type TokenType =
  | "register-access"
  | "register-refresh"
  | "anonymous-access"
  | "anonymous-refresh";

export type TokenPayloadType = Partial<UserType> & { type: TokenType };

export interface SystemConfigsType {
  code: string;
  defaultConfigurations: any;
  channelConfigurations: any;
  isActive: true;
}

export interface PhoneType {
  dialCode: string;
  number: string;
}

export interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: PhoneType;
  role: string;
  password?: string;
  loginType?: string;
  lastOnline?: string;
  createdAt?: string;
  updatedAt?: string;
  isActive?: Boolean;
  createdBy?: string;
  updatedBy?: string;
  metaStatus?: string;
  token?: string;
}

export interface ProductType {
  _id: string;
  name: string;
  medias: string[];
  shortDescription?: string;
  description?: string;
  parentId?: string;
  category: string;
  brand: string;
  haveVariants: boolean;
  isVariant: boolean;
  isSellable: boolean;
  isCodAvailable?: boolean;
  variantInfo?: string[];
  createdAt?: string;
  updatedAt?: string;
  isActive?: Boolean;
  createdBy?: string;
  updatedBy?: string;
  metaStatus?: string;
}

export interface BasicDBEmailConfig {
  from: string;
  name: string;
  templateId: string;
}

export interface BulkProductUploadStatusResponse {
  isAvailable: boolean;
  startTime?: string;
  Estimate?: string;
  totalDocuments?: number;
  completedDocuments?: number;
  createdBy?: string;
  progress?: number;
}

export interface ProductPriceType {
  productId: string;
  listPrice: number;
  sellPrice: number;
  taxId?: string;
  taxPrice?: number;
}

export interface PriceTableType {
  _id: string;
  prices: ProductPriceType[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  metaStatus?: string;
}

export interface ProductStockType {
  productId: string;
  totalStocks: number;
  saftyStock: number;
  allocatedStocks: number;
}

export interface WarehouseType {
  _id: string;
  name: string;
  stocks?: ProductStockType[];
  country: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  metaStatus?: string;
}

export interface WarehouseStockFilter {
  stock: {
    productId: string;
    totalStocks: number;
    saftyStock: number;
    allocatedStocks: number;
  };
}

export type OrderStatusTypes =
  | "CREATED"
  | "PAYMENT_INITIATED"
  | "PAYMENT_DECLINED"
  | "ORDER";

export type LineItemType = {
  quantity: number;
  productId: string;
  adjustments: string;
};

export interface CartType {
  _id: string;
  orderId?: string;
  userId: string;
  lines?: LineItemType[] | [];
  status: OrderStatusTypes;
  isAnonymous: Boolean;
  createdAt?: String;
  updatedAt?: String;
  isActive?: Boolean;
  createdBy?: String;
  updatedBy?: String;
  metaStatus?: String;
  shippingAddress?: CartAddressesType;
  billingAddress?: CartAddressesType;
  sessionId?: string;
  orderItemsPrices?: PaymentLineItemPrice[];
  ordrPrice?: PaymentCalculatedPriceInfoType;
  orderDetails?: {
    paymentMethod: "cod" | "card";
    cardName?: string;
    lastDigits?: string;
  };
}

export type CartAddressType = "SHIPPING" | "BILLING";

export interface CartAddressesType {
  type?: CartAddressType;
  point: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pin: number;
}

export interface AddressType extends CartAddressesType {
  _id: string;
  userId: string;
  landmark: string;
  isDefault: boolean;
  createdAt?: String;
  updatedAt?: String;
  isActive?: Boolean;
  createdBy?: String;
  updatedBy?: String;
  metaStatus?: String;
}

/**************  Payments */
export interface PaymentSessionType {
  id: string;
  url: string;
}

export interface PaymentCustomerType {
  name: string;
  address: {
    line1: string;
    postal_code: string;
    city: string;
    state: string;
    country: string;
  };
}

export interface PaymentLineItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      images: string[];
      description: string;
    };
    unit_amount: number;
  };
  quantity: number;
}

export type PaymentShippingChargeType = "fixed_amount";

export interface PaymentShippingCharge {
  shipping_rate_data: {
    display_name: string;
    type: PaymentShippingChargeType;
    fixed_amount: {
      amount: number;
      currency: string;
    };
  };
}

export interface PaymenyIntentCardInfo {
  brand: string;
  last4: string;
}

export interface PaymentIntentMethodType {
  type: string;
  card: PaymenyIntentCardInfo;
}

export interface PaymentIntentType {
  id: string;
  amount_received: number;
  status: "succeeded" | "decliend";
  payment_method: PaymentIntentMethodType;
  type?: string;
  card?: string;
  digit?: string;
}

export interface PaymentCalculatedPriceInfoType {
  gross: number;
  net: number;
  discounts: number;
  tax: number;
  total: number;
}

export interface PaymentCalculatedPriceInfoResponseType
  extends PaymentCalculatedPriceInfoType {
  pricedProductInfos: PricedProductInfo[];
}

export interface PricedProductInfo {
  product: ProductType;
  unit: Partial<PaymentCalculatedPriceInfoType>;
  order: Partial<PaymentCalculatedPriceInfoType>;
  quantity: number;
}

export interface PaymentLineItemPrice {
  id: string;
  unit: Partial<PaymentCalculatedPriceInfoType>;
  order: Partial<PaymentCalculatedPriceInfoType>;
  quantity: number;
}

export interface ShippingMethodType {
  _id: string;
  name: string;
  country: string[];
  state: string[];
  allCountry: boolean;
  allStates: boolean;
  sellPrice: number;
  listPrice: number;
  priceConfig: ShippingMethodPriceLimits;
  weightConfig: ShippingMethodWeightLimits;
  quantityConfig: ShippingMethodQuantityLimits;
  enabledPriceLimits: boolean;
  enabledWeightLimits: boolean;
  enabledQuantityLimits: boolean;
  createdAt?: string;
  updatedAt?: string;
  isActive: boolean;
  createdBy?: string;
  updatedBy?: string;
  metaStatus?: string;
}
