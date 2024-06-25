import contants from "@core/constants/contants";
import pubsub from "@core/pubSub";
import sequence from "@core/sequence";
import {
  BulkProductUploadStatusResponse,
  ContextObjectType,
  CreateProductArgsType,
  ProductListArgsType,
  ProductPriceType,
  ProductType,
  UpdateProductArgsType,
} from "@core/types";
import { getCurrentTime } from "@core/utils/timeUtils";
import { readXlsx } from "@core/utils/xlsxUtils";
import BadRequestError from "@errors/BadrequestError";
import NotFoundError from "@errors/NotFoundError";
import {
  getSystemConfigurations,
  updateBulkProductQueueStatus,
} from "@repositories/organizationRepository";
import productRepository, {
  getProductInfoById,
} from "@repositories/productRepository";
import { FileUpload } from "graphql-upload-ts";
import productBulkUploader from "./productBulkUploader";
import { productPriceInfo } from "@services/priceTableService";
import { findProductAvailableStocksByProductId } from "@services/warehouseService";

/**
 * Controller used to get product by Id
 * @param args
 * @returns
 */
export const getProductById = async (id: string) => {
  if (!id) {
    throw new BadRequestError("Invalid productId");
  }
  const product = await getProductInfoById(id);
  if (!product?._id) {
    throw new NotFoundError("Product not found");
  }
  return product;
};

const createVariantProduct = async (
  productId: string,
  variantInfo: CreateProductArgsType["productCreateInput"],
  createdBy: string
) => {
  const parentProduct = await getProductInfoById(productId, true);
  if (!parentProduct?._id) {
    throw new BadRequestError("Parent product not active/found");
  }
  // TODO: Need to verify brand and category
  const skuId = await sequence.skuId();
  const product = await productRepository.createProduct({
    _id: skuId,
    category: parentProduct.category,
    brand: parentProduct.brand,
    haveVariants: false,
    isSellable: variantInfo?.isSellable,
    name: variantInfo.name,
    medias: variantInfo?.medias,
    isVariant: true,
    isActive: true,
    isCodAvailable: variantInfo.isCodAvailable,
    parentId: productId,
    createdAt: getCurrentTime(),
    updatedAt: getCurrentTime(),
    updatedBy: createdBy,
    createdBy,
  });
  if (!parentProduct.haveVariants) {
    productRepository.updateProduct(productId, { haveVariants: true });
  }
  return product;
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
  const { productCreateInput } = args || {};

  if (!productCreateInput.name) {
    throw new BadRequestError("Name is mandatory");
  }
  if (productCreateInput.isVariant) {
    return await createVariantProduct(
      productCreateInput.parentId,
      productCreateInput,
      context?.email
    );
  }
  const productId = await sequence.productId();
  const product = await productRepository.createProduct({
    _id: productId,
    category: productCreateInput.category,
    brand: productCreateInput.brand,
    haveVariants: false,
    isSellable: productCreateInput?.isSellable,
    name: productCreateInput.name,
    medias: productCreateInput?.medias,
    isVariant: false,
    isActive: true,
    isCodAvailable: productCreateInput.isCodAvailable,
    createdAt: getCurrentTime(),
    updatedAt: getCurrentTime(),
    updatedBy: context.email,
    createdBy: context.email,
  });
  return product;
};

/**
 * Controller used to update product
 * @param args
 * @returns
 */
const updateProduct = async (
  args: UpdateProductArgsType,
  context: ContextObjectType
) => {
  const { _id, productUpdateInput } = args || {};
  if (!_id) {
    throw new BadRequestError("ProductId is Mandatory");
  }
  const product = await getProductInfoById(_id);
  if (!product?._id) {
    throw new NotFoundError("Product not found");
  }
  const updatedProduct = {
    name: productUpdateInput.name || product.name,
    medias:
      Array.isArray(productUpdateInput?.medias) &&
      productUpdateInput.medias.length > 0
        ? productUpdateInput.medias
        : product.medias,
    isSellable: productUpdateInput?.isSellable || product.isSellable,
    isCodAvailable: productUpdateInput?.isCodAvailable,
    updatedAt: getCurrentTime(),
    updatedBy: context.email,
  } as Partial<ProductType>;

  if (!product.isVariant) {
    updatedProduct.category = productUpdateInput.category || product.category;
    updatedProduct.brand = productUpdateInput.brand || product.brand;

    if (product.haveVariants) {
      const updateVariantData = {} as Partial<ProductType>;
      const isCategoryChanged = updatedProduct.category !== product.category;
      const isBrandChanged = updatedProduct.brand !== product.brand;
      if (isBrandChanged || isCategoryChanged) {
        updateVariantData.category = updatedProduct.category;
        updateVariantData.brand = updatedProduct.brand;
      }
      await productRepository.updateVariants(product._id, updateVariantData);
    }
  }
  return await productRepository.updateProduct(_id, updatedProduct);
};

/**
 * Controller used to update product status
 * @param args
 * @returns
 */
export const statusUpdateProduct = async (
  _id: string,
  context: ContextObjectType
) => {
  if (!_id) {
    throw new BadRequestError("ProductId is Mandatory");
  }
  const product = await getProductInfoById(_id);
  if (!product?._id) {
    throw new NotFoundError("Product not found");
  }
  const productUpdateBody = {
    isActive: !product.isActive,
    updatedAt: getCurrentTime(),
    updatedBy: context.email,
  } as Partial<ProductType>;
  const updatedProduct = await productRepository.updateProduct(
    _id,
    productUpdateBody
  );
  return {
    success: updatedProduct.isActive === !product.isActive,
    status: !product.isActive,
  };
};

/**
 * Controller used to get product variant
 * @param product
 * @returns
 */
export const getVariantInfo = async (product: ProductType) => {
  const { _id, haveVariants } = product || {};
  if (haveVariants) {
    return await productRepository.getProductVariants(_id);
  }
  return [];
};

/**
 * Controller used to get product list
 * @param args
 * @returns
 */
export const getProductList = async (
  listArgs: ProductListArgsType["productListInput"]
) => {
  const {
    page = 0,
    size = 5,
    search,
    sortBy = "updatedAt",
    sortDirection = "desc",
    active = "ALL",
    type = "all",
  } = listArgs || {};
  const { products, count } = await productRepository.getProductList(
    page,
    size,
    search,
    sortBy,
    sortDirection,
    active,
    type
  );
  const totalPages = Math.ceil(count / size);
  const pageInfo = {
    isStart: page === 0,
    isEnd: page >= totalPages - 1,
    totalPages,
    totalMatches: count,
    currentMatchs: products.length,
  };

  return {
    products,
    pageInfo,
  };
};

const getProductBulkUploadDBConfigs = async () => {
  const configs = await getSystemConfigurations("PRODUCT_BULK_UPLOAD_QUEUE");
  const defaultConfig =
    configs.defaultConfigurations as BulkProductUploadStatusResponse;
  if (configs.isActive && defaultConfig?.isAvailable) {
    pubsub.publish(contants.subscribtionKeys.PRODUCTS_UPLOAD_STATUS, {
      productBulkUploadStatus: defaultConfig,
    });
  }
};

/**
 * Controller used to check status of bulk upload product
 * @param args
 * @returns
 */
export const productBulkUploadStatusCheck = () => {
  getProductBulkUploadDBConfigs();
  return pubsub?.asyncIterator([
    contants.subscribtionKeys.PRODUCTS_UPLOAD_STATUS,
  ]);
};

const bulkProductSignalGenerator = async (
  status: BulkProductUploadStatusResponse
) => {
  await updateBulkProductQueueStatus(status);
  pubsub.publish(contants.subscribtionKeys.PRODUCTS_UPLOAD_STATUS, {
    productBulkUploadStatus: status,
  });
};

/**
 * Controller used to bulk upload product
 * @param args
 * @returns
 */
export const bulkUploadProduct = async (
  inputFile: {
    file: Promise<FileUpload>;
  },
  context: ContextObjectType
) => {
  if (!inputFile) {
    throw new BadRequestError("Invalid file");
  }

  const configs = await getSystemConfigurations("PRODUCT_BULK_UPLOAD_QUEUE");
  const defaultConfig =
    configs.defaultConfigurations as BulkProductUploadStatusResponse;

  if (!configs.isActive || !defaultConfig?.isAvailable) {
    throw new BadRequestError("Product Bulk Upload Option Disabled");
  }

  const status: BulkProductUploadStatusResponse = {
    isAvailable: false,
    createdBy: context.email,
    startTime: getCurrentTime(),
    Estimate: "Calculating...",
  };
  await bulkProductSignalGenerator(status);
  const jsonData = (await readXlsx(inputFile.file)) || [];
  await bulkProductSignalGenerator({
    isAvailable: false,
    totalDocuments: jsonData?.length,
    completedDocuments: 0,
    Estimate: `${
      Math.trunc(jsonData?.length / contants.bulkUploadProduct.BATCH_SIZE) + 1
    } sec`,
    progress: 0,
  });

  let currentBatchNumber = 0;
  for (
    let i = 0;
    i < jsonData.length;
    i += contants.bulkUploadProduct.BATCH_SIZE
  ) {
    const batch = jsonData.slice(i, i + contants.bulkUploadProduct.BATCH_SIZE);
    await productBulkUploader(batch as ProductType[], context.email);
    currentBatchNumber += batch.length;
    await bulkProductSignalGenerator({
      ...status,
      completedDocuments: currentBatchNumber,
      totalDocuments: jsonData?.length,
      Estimate: `${
        Math.trunc(
          (jsonData?.length - currentBatchNumber) /
            contants.bulkUploadProduct.BATCH_SIZE
        ) + 1
      } sec`,
      progress: Math.trunc((currentBatchNumber * 100) / jsonData.length),
    });
  }
  await bulkProductSignalGenerator({
    ...status,
    Estimate: "completed",
    completedDocuments: jsonData?.length,
    totalDocuments: jsonData?.length,
    isAvailable: true,
    progress: 100,
  });

  return true;
};

/**
 * Controller used to get product price
 * @param product
 * @returns
 */
export const getProductPriceInfo = async (product: ProductType) => {
  const productPrice: ProductPriceType | null | undefined =
    await productPriceInfo(product._id, product?.isVariant, product?.parentId);
  return {
    productId: product._id,
    listPrice: productPrice?.listPrice || 0,
    sellPrice: productPrice?.sellPrice || 0,
    taxPrice: productPrice?.taxPrice || 0,
  };
};

/**
 * Controller used to find product available purchasable quantity
 * @param product
 * @returns
 */
export const findProductAvailableStocks = async (product: ProductType) => {
  return await findProductAvailableStocksByProductId(product._id);
};

export default {
  getProductById,
  createProduct,
  updateProduct,
  statusUpdateProduct,
  getVariantInfo,
  getProductList,
  productBulkUploadStatusCheck,
  bulkUploadProduct,
  getProductPriceInfo,
  findProductAvailableStocks,
};
