import { CategoryType } from "@core/types";
import Category from "@schemas/CategorySchema";

const createCategory = async (category: CategoryType) => {
  return await new Category(category).save();
};

const findcategoryById = async (_id: string, isActive?: boolean) => {
  if (isActive) {
    return (await Category.findOne({ _id, isActive })) as CategoryType;
  }
  return (await Category.findOne({ _id })) as CategoryType;
};

const checkAllCategoriesExits = async (ids: string[]) => {
  const count = await Category.countDocuments({
    _id: { $in: ids },
  });
  return count === ids.length;
};

export default {
  createCategory,
  findcategoryById,
  checkAllCategoriesExits,
};
