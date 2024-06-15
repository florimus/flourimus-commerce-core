import { ContextObjectType, CreateProductArgsType, ProductArgsType } from "@core/types";
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
