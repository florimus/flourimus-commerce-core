import { ProductType } from "@types";
import Product from "src/schemas/ProductSchema";

export const getProductInfoById = async (_id: string, isActive?: boolean) => {
  if (isActive) {
    return (await Product.findOne({ _id, isActive })) as ProductType;
  }
  return (await Product.findOne({ _id })) as ProductType;
};

const updateProduct = async (_id: string, data: Partial<ProductType>) => {
  await Product.updateOne({ _id }, data);
  return (await Product.findOne({ _id })) as ProductType;
};

export const createProduct = async (product: ProductType) => {
  return await new Product(product).save();
};

const getProductVariants = async (parentId: string, isActive?: boolean) => {
  if (isActive) {
    return (await Product.find({ parentId, isActive })) as ProductType[];
  }
  return (await Product.find({ parentId })) as ProductType[];
};

export default {
  createProduct,
  updateProduct,
  getProductVariants,
};
