import { ContextObjectType } from "@core/types";
import cartServiceImpl from "./impl/cartServiceImpl";
/**
 * Controller used to create cart
 * @param context
 * @returns
 */
export const createUserCart = async (context: ContextObjectType) => {
  return await cartServiceImpl.createUserCart(context);
};
