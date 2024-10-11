import { updateCategoryStatus } from "@services/categoryService";
import { userContextWithRegisteredUser } from "../customer/fixtures";
import {
  updateCategoryStatus_description,
  VERIFY_CATEGORY_STATUS_WITH_INVALID_ID,
  VERIFY_CATEGORY_STATUS_WITH_OUT_ID,
  VERIFY_CATEGORY_STATUS_WITH_VALID_ID,
} from "./constants";
import categoryRepository from "@repositories/categoryRepository";

import { ContextObjectType } from "@core/types";
import { categoryWithActiveSatus, categoryWithInActiveSatus } from "./fixtures";
import NotFoundError from "@errors/NotFoundError";
import BadRequestError from "@errors/BadrequestError";

describe(updateCategoryStatus_description, () => {
  test(VERIFY_CATEGORY_STATUS_WITH_VALID_ID, async () => {
    const userContext = userContextWithRegisteredUser;
    const categoryId = { _id: "CAT001" };
    mockFindcategoryById.mockResolvedValue(categoryWithActiveSatus);
    mockUpdateCategory.mockResolvedValue(categoryWithInActiveSatus);
    const response = await updateCategoryStatus(
      categoryId,
      userContext as ContextObjectType
    );
    expect(response.status).toBe(false);
    expect(response.success).toBe(true);
  });

  test(VERIFY_CATEGORY_STATUS_WITH_INVALID_ID, async () => {
    const userContext = userContextWithRegisteredUser;
    const categoryId = { _id: "_CAT001_" };
    mockFindcategoryById.mockResolvedValue(null);
    mockUpdateCategory.mockResolvedValue(null);
    await expect(
      updateCategoryStatus(categoryId, userContext as ContextObjectType)
    ).rejects.toThrow(new NotFoundError("Category not found"));
  });

  test(VERIFY_CATEGORY_STATUS_WITH_OUT_ID, async () => {
    const userContext = userContextWithRegisteredUser;
    const categoryId = { _id: "" };
    mockFindcategoryById.mockResolvedValue(null);
    mockUpdateCategory.mockResolvedValue(null);
    await expect(
      updateCategoryStatus(categoryId, userContext as ContextObjectType)
    ).rejects.toThrow(new BadRequestError("Category id is Mandatory"));
  });
});

jest.mock("@repositories/categoryRepository", () => ({
  updateCategory: jest.fn(),
  findcategoryById: jest.fn(),
}));

const mockUpdateCategory = categoryRepository.updateCategory as jest.Mock;
const mockFindcategoryById = categoryRepository.findcategoryById as jest.Mock;
