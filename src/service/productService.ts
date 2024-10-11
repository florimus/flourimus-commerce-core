import {
  ContextObjectType,
  CreateProductArgsType,
  ProductArgsType,
  ProductBulkUploadArgs,
  ProductListArgsType,
  ProductType,
  UpdateProductArgsType,
} from "@core/types";
import productServiceImpl from "./impl/productServiceImpl";

/**
 * Controller used to get product by Id
 * @param args
 * @returns
 */
export const getProductById: (
  args: ProductArgsType
) => Promise<ProductType> = async (args: ProductArgsType) => {
  return await productServiceImpl.getProductById(args._id);
};

/**
 * Controller used to get create product
 * @param args
 * @returns
 */
export const createProduct = async (
  args: CreateProductArgsType,
  context: ContextObjectType
) => {
  return await productServiceImpl.createProduct(args, context);
};

/**
 * Controller used to update product
 * @param args
 * @returns
 */
export const updateProduct = async (
  args: UpdateProductArgsType,
  context: ContextObjectType
) => {
  return await productServiceImpl.updateProduct(args, context);
};

/**
 * Controller used to update product status
 * @param args
 * @returns
 */
export const statusUpdateProduct = async (
  args: ProductArgsType,
  context: ContextObjectType
) => {
  return await productServiceImpl.statusUpdateProduct(args._id, context);
};

/**
 * Controller used to get product variant
 * @param product
 * @returns
 */
export const getVariantInfo = async (product: ProductType) => {
  return await productServiceImpl.getVariantInfo(product);
};

/**
 * Controller used to get product list
 * @param args
 * @returns
 */
export const getProductList = async (args: ProductListArgsType) => {
  return await productServiceImpl.getProductList(args.productListInput);
};

/**
 * Controller used to check status of bulk upload product
 * @param args
 * @returns
 */
export const productBulkUploadStatusCheck = () => {
  return productServiceImpl.productBulkUploadStatusCheck();
};

/**
 * Controller used to bulk upload product
 * @param args
 * @returns
 */
export const bulkUploadProduct = async (
  args: ProductBulkUploadArgs,
  context: ContextObjectType
) => {
  return await productServiceImpl.bulkUploadProduct(args.file, context);
};

/**
 * Controller used to get product price
 * @param product
 * @returns
 */
export const getProductPriceInfo = async (product: ProductType) => {
  return await productServiceImpl.getProductPriceInfo(product);
};

/**
 * Controller used to find product available purchasable quantity
 * @param product
 * @returns
 */
export const findProductAvailableStocks = async (product: ProductType) => {
  return await productServiceImpl.findProductAvailableStocks(product);
};
/**
 * Controller used to verify product available
 * @param productIds
 * @param active
 * @returns
 */
export const verifyProductIds = async (productIds: string[], active?: boolean) => {
  return await productServiceImpl.verifyProductIds(productIds, active);
};
