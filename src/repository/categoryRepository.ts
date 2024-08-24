import { CategoryType } from "@core/types";
import Category from "@schemas/CategorySchema";

const createCategory = async (category: CategoryType) => {
  return await new Category(category).save();
};

export default {
  createCategory,
};
