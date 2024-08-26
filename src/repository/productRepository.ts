import { ProductType } from "@types";
import { FilterQuery } from "mongoose";
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

const updateVariants = async (parentId: string, data: Partial<ProductType>) => {
  return await Product.updateMany({ parentId }, { $set: data });
};

const getProductList = async (
  page: number,
  size: number,
  search: string,
  sortBy: string,
  sortDirection: string,
  active: "ACTIVE" | "INACTIVE" | "ALL",
  type: "product" | "variant" | "all"
) => {
  const query: FilterQuery<ProductType> = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { id: { $regex: search, $options: "i" } },
    ];
  }
  if (active === "ACTIVE") {
    query.isActive = true;
  } else if (active === "INACTIVE") {
    query.isActive = false;
  }
  if (type === "product") {
    query.isVariant = false;
  } else if (type === "variant") {
    query.isVariant = true;
  }
  const products = await Product.find(query)
    .limit(size)
    .sort({ [sortBy]: sortDirection === "ASC" ? 1 : -1 })
    .skip(size * (page ?? 0))
    .exec();
  const count = await Product.countDocuments(query);
  return { products, count };
};

const findProductsByIds = async (ids: string[]) => {
  return await Product.find({
    _id: { $in: ids },
  });
};

export default {
  createProduct,
  updateProduct,
  getProductVariants,
  updateVariants,
  getProductList,
  getProductInfoById,
  findProductsByIds,
};
