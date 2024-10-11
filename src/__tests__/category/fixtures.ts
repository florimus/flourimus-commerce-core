import { CategoryType } from "@core/types";

export const categoryWithActiveSatus: CategoryType = {
  _id: "CAT000",
  name: "Dummy category",
  description: "description",
  productIds: [],
  subCategoryIds: [],
  medias: [],
  isActive: true,
};

export const categoryWithInActiveSatus: CategoryType = {
  ...categoryWithActiveSatus,
  isActive: false,
};
