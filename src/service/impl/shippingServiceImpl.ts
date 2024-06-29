import {
  checkCountries,
  checkStatesByCountryCode,
} from "@core/constants/country";
import {
  ContextObjectType,
  ShippingMethodCreateArgsType,
  ShippingMethodListArgsType,
  ShippingMethodPriceLimits,
  ShippingMethodQuantityLimits,
  ShippingMethodType,
  ShippingMethodUpdateArgsType,
  ShippingMethodWeightLimits,
} from "@core/types";
import { v4 as uuidv4 } from "uuid";
import BadRequestError from "@errors/BadrequestError";
import { getCurrentTime } from "@core/utils/timeUtils";
import shippingRepository from "@repositories/shippingRepository";
import NotFoundError from "@errors/NotFoundError";

const validateCountryConfig = (codes: string[], allCountry: boolean) =>
  allCountry ? true : checkCountries(codes);

const validateStatesConfig = (
  countrycodes: string[],
  state: string[],
  allStates: boolean
) => (allStates ? true : checkStatesByCountryCode(countrycodes, state));

const populatePriceConfig = (
  priceConfig: ShippingMethodPriceLimits,
  shippingMethod: Partial<ShippingMethodType>,
  enabledPriceLimits: boolean
) => {
  if (enabledPriceLimits) {
    if (priceConfig?.minPrice > priceConfig?.maxPrice) {
      throw new BadRequestError(
        "Minimum price should be less than Maximum price"
      );
    }
    shippingMethod.enabledPriceLimits = true;
    shippingMethod.priceConfig = priceConfig;
  } else {
    shippingMethod.enabledPriceLimits = false;
  }
};

const populateWeightConfig = (
  weightConfig: ShippingMethodWeightLimits,
  shippingMethod: Partial<ShippingMethodType>,
  enabledWeightLimits: boolean
) => {
  if (enabledWeightLimits) {
    if (weightConfig?.minWeight > weightConfig?.maxWeight) {
      throw new BadRequestError(
        "Minimum weight should be less than Maximum weight"
      );
    }
    shippingMethod.enabledWeightLimits = true;
    shippingMethod.weightConfig = weightConfig;
  } else {
    shippingMethod.enabledWeightLimits = false;
  }
};

const populateQuantityConfig = (
  quantityConfig: ShippingMethodQuantityLimits,
  shippingMethod: Partial<ShippingMethodType>,
  enabledQuantityLimits: boolean
) => {
  if (enabledQuantityLimits) {
    if (quantityConfig?.maxQuantity > quantityConfig?.maxQuantity) {
      throw new BadRequestError(
        "Minimum quantity should be less than Maximum quantity"
      );
    }
    shippingMethod.enabledQuantityLimits = true;
    shippingMethod.quantityConfig = quantityConfig;
  } else {
    shippingMethod.enabledQuantityLimits = false;
  }
};

/**
 * Controller used to create shipping method
 * @param args
 * @returns
 */
const shippingMethodCreate = async (
  methodCreateInput: ShippingMethodCreateArgsType["shippingMethodCreateInput"],
  context: ContextObjectType
) => {
  const {
    name,
    country,
    state,
    allCountry,
    allStates,
    sellPrice,
    listPrice,
    priceConfig,
    weightConfig,
    quantityConfig,
    enabledPriceLimits,
    enabledWeightLimits,
    enabledQuantityLimits,
  } = methodCreateInput || {};
  if (!name) {
    throw new BadRequestError("Name is mandatory");
  }
  if (!validateCountryConfig(country, allCountry)) {
    throw new BadRequestError("Invalid country configurations");
  }
  if (!validateStatesConfig(country, state, allStates)) {
    throw new BadRequestError("Invalid state configurations");
  }
  const shippingMethod: Partial<ShippingMethodType> = {
    _id: uuidv4(),
    sellPrice,
    listPrice,
    isActive: true,
    createdBy: context.email,
    updatedBy: context.email,
    createdAt: getCurrentTime(),
    updatedAt: getCurrentTime(),
  };
  shippingMethod.name = name;
  shippingMethod.country = country;
  shippingMethod.allCountry = allCountry;
  shippingMethod.state = state;
  shippingMethod.allStates = allStates;
  populatePriceConfig(priceConfig, shippingMethod, enabledPriceLimits);
  populateWeightConfig(weightConfig, shippingMethod, enabledWeightLimits);
  populateQuantityConfig(quantityConfig, shippingMethod, enabledQuantityLimits);
  return shippingRepository.createShippingMethod(shippingMethod);
};

/**
 * Controller used to get shippingMethod details
 * @param args
 * @returns
 */
export const shippingMethodInfo = async (_id: string) => {
  if (!_id) {
    throw new BadRequestError("ShippingId is mandatory");
  }
  const shippingMethod = await shippingRepository.getShippingMethodById(_id);
  if (shippingMethod?._id) {
    return shippingMethod;
  }
  throw new NotFoundError("Shipping not found");
};

/**
 * Controller used to update shipping method
 * @param args
 * @returns
 */
export const shippingMethodupdate = async (
  args: ShippingMethodUpdateArgsType,
  context: ContextObjectType
) => {
  const { _id, shippingMethodUpdateInput } = args || {};
  if (!_id) {
    throw new BadRequestError("ShippingId is mandatory");
  }
  const shippingMethod = await shippingRepository.getShippingMethodById(_id);
  if (!shippingMethod?._id) {
    throw new NotFoundError("Shipping not found");
  }
  if (shippingMethodUpdateInput?.name) {
    shippingMethod.name = shippingMethodUpdateInput.name;
  }
  if (shippingMethodUpdateInput?.listPrice) {
    shippingMethod.listPrice = shippingMethodUpdateInput.listPrice;
  }
  if (shippingMethodUpdateInput?.sellPrice) {
    shippingMethod.sellPrice = shippingMethodUpdateInput.sellPrice;
  }
  if (
    validateCountryConfig(
      shippingMethodUpdateInput?.country,
      shippingMethodUpdateInput?.allCountry
    )
  ) {
    shippingMethod.country = shippingMethodUpdateInput.country;
    shippingMethod.allCountry = shippingMethodUpdateInput.allCountry;
  }
  if (
    validateStatesConfig(
      shippingMethodUpdateInput?.country,
      shippingMethodUpdateInput?.state,
      shippingMethodUpdateInput?.allStates
    )
  ) {
    shippingMethod.state = shippingMethodUpdateInput.state;
    shippingMethod.allStates = shippingMethodUpdateInput.allStates;
  }
  populatePriceConfig(
    shippingMethodUpdateInput?.priceConfig,
    shippingMethod,
    shippingMethodUpdateInput?.enabledPriceLimits
  );
  populateWeightConfig(
    shippingMethodUpdateInput?.weightConfig,
    shippingMethod,
    shippingMethodUpdateInput?.enabledWeightLimits
  );
  populateQuantityConfig(
    shippingMethodUpdateInput?.quantityConfig,
    shippingMethod,
    shippingMethodUpdateInput?.enabledQuantityLimits
  );
  shippingMethod.updatedAt = getCurrentTime();
  shippingMethod.updatedBy = context.email;
  return await shippingRepository.updateShippingMethod(_id, shippingMethod);
};

/**
 * Controller used to list shippingMethods
 * @param args
 * @returns
 */
export const shippingMethodList = async (
  listArgs: ShippingMethodListArgsType["shippingsListInput"]
) => {
  const { page = 0, size = 5, search } = listArgs || {};
  const { shippings, count } = await shippingRepository.getShippingMethodList(
    page,
    size,
    search,
    "updatedAt",
    "desc"
  );
  const totalPages = Math.ceil(count / size);
  const pageInfo = {
    isStart: page === 0,
    isEnd: page >= totalPages - 1,
    totalPages,
    totalMatches: count,
    currentMatchs: shippings.length,
  };

  return {
    shippings,
    pageInfo,
  };
};

export default {
  shippingMethodCreate,
  shippingMethodInfo,
  shippingMethodupdate,
  shippingMethodList,
};
