import sequence from "@core/sequence";
import {
  ContextObjectType,
  CreateProductArgsType,
  ProductType,
  UpdateProductArgsType,
} from "@core/types";
import { getCurrentTime } from "@core/utils/timeUtils";
import BadRequestError from "@errors/BadrequestError";
import NotFoundError from "@errors/NotFoundError";
import productRepository, {
  getProductInfoById,
} from "@repositories/productRepository";

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
    category: variantInfo.category,
    brand: variantInfo.brand,
    haveVariants: false,
    isSellable: variantInfo?.isSellable,
    name: variantInfo.name,
    medias: variantInfo?.medias,
    isVariant: true,
    isActive: true,
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
  const newProduct = {
    category: productUpdateInput.category || product.category,
    brand: productUpdateInput.brand || product.brand,
    isSellable: productUpdateInput?.isSellable || product.isSellable,
    name: productUpdateInput.name || product.name,
    medias: productUpdateInput?.medias || product.medias,
    updatedAt: getCurrentTime(),
    updatedBy: context.email,
  } as Partial<ProductType>;
  return await productRepository.updateProduct(_id, newProduct);
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

export default {
  getProductById,
  createProduct,
  updateProduct,
  statusUpdateProduct,
};
