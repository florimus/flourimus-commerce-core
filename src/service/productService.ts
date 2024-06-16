import { ContextObjectType, CreateProductArgsType, ProductArgsType, UpdateProductArgsType } from "@core/types";
import productServiceImpl from "./impl/productServiceImpl";

/**
 * Controller used to get product by Id
 * @param args
 * @returns
 */
export const getProductById = async (args: ProductArgsType) => {
    return await productServiceImpl.getProductById(args._id);
}

/**
 * Controller used to get create product
 * @param args
 * @returns
 */
export const createProduct = async (args: CreateProductArgsType, context: ContextObjectType) => {
    return await productServiceImpl.createProduct(args, context);
}

/**
 * Controller used to update product
 * @param args
 * @returns
 */
export const updateProduct = async (args: UpdateProductArgsType, context: ContextObjectType) => {
    return await productServiceImpl.updateProduct(args, context);
}

/**
 * Controller used to update product status
 * @param args
 * @returns
 */
export const statusUpdateProduct = async (args: ProductArgsType, context: ContextObjectType) => {
    return await productServiceImpl.statusUpdateProduct(args._id, context);
}
