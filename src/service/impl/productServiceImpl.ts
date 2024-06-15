import sequence from "@core/sequence";
import { ContextObjectType, CreateProductArgsType } from "@core/types";
import { getCurrentTime } from "@core/utils/timeUtils";
import BadRequestError from "@errors/BadrequestError";
import NotFoundError from "@errors/NotFoundError";
import productRepository, { getProductInfoById, updateProduct } from "@repositories/productRepository"

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
}

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
    await updateProduct(productId, { haveVariants: true })
  }
  return product;
}

/**
 * Controller used to get create product
 * @param args
 * @returns
 */
export const createProduct = async (args: CreateProductArgsType, context: ContextObjectType) => {
  const { productCreateInput } = args || {};

  if (!productCreateInput.name) {
    throw new BadRequestError("Name is mandatory");
  }
  if (productCreateInput.isVariant) {
    return await createVariantProduct(productCreateInput.parentId, productCreateInput, context?.email);
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
}

export default {
  getProductById,
  createProduct
}
