import { getCurrentUserInfo, getUserInfo } from "@services/customerService";
import { ContextObjectType, UserQueryArgsType } from "@core/types";
import {
  getCurrentUserInfo_description,
  getUserInfo_description,
  VERIFY_USER_CONTEXT_WITH_ANONYMOUS_UESR,
  VERIFY_USER_CONTEXT_WITH_LOGIN_UESR,
  VERIFY_USER_INFO_WITH_INVALID_EMAIL,
  VERIFY_USER_INFO_WITH_INVALID_ID,
  VERIFY_USER_INFO_WITH_VALID_EMAIL,
  VERIFY_USER_INFO_WITH_VALID_ID,
} from "./constants";
import { getUserByIdOrEmail } from "@repositories/userRepository";
import {
  userContextWithAnonymousUser,
  userContextWithRegisteredUser,
  userWithAllData,
} from "./fixtures";
import NotFoundError from "@errors/NotFoundError";

describe(getCurrentUserInfo_description, () => {
  test(VERIFY_USER_CONTEXT_WITH_LOGIN_UESR, async () => {
    const userContext = userContextWithRegisteredUser;
    expect(
      await getCurrentUserInfo(userContext as ContextObjectType)
    ).toStrictEqual(userContext);
  });

  test(VERIFY_USER_CONTEXT_WITH_ANONYMOUS_UESR, async () => {
    const UserContext = userContextWithAnonymousUser;
    expect(
      await getCurrentUserInfo(UserContext as ContextObjectType)
    ).toStrictEqual(UserContext);
  });
});

describe(getUserInfo_description, () => {
  test(VERIFY_USER_INFO_WITH_VALID_EMAIL, async () => {
    const userQueryArgsTypeWithEmailOnly = {
      email: "admin@gmail.com",
    };
    mockGetUserByIdOrEmail.mockResolvedValue(userWithAllData);
    expect(
      await getUserInfo(userQueryArgsTypeWithEmailOnly as UserQueryArgsType)
    ).toStrictEqual(userWithAllData);
  });

  test(VERIFY_USER_INFO_WITH_VALID_ID, async () => {
    const userQueryArgsTypeWithIdOnly = {
      _id: "USR001",
    };
    mockGetUserByIdOrEmail.mockResolvedValue(userWithAllData);
    expect(
      await getUserInfo(userQueryArgsTypeWithIdOnly as UserQueryArgsType)
    ).toStrictEqual(userWithAllData);
  });

  test(VERIFY_USER_INFO_WITH_INVALID_ID, async () => {
    const userQueryArgsTypeWithIdOnly = {
      _id: "_USR001_",
    };
    mockGetUserByIdOrEmail.mockResolvedValue({});
    await expect(
      getUserInfo(userQueryArgsTypeWithIdOnly as UserQueryArgsType)
    ).rejects.toThrow(new NotFoundError("No user founds"));
  });

  test(VERIFY_USER_INFO_WITH_INVALID_EMAIL, async () => {
    const userQueryArgsTypeWithIdOnly = {
      email: "unknown.email@gmail.com",
    };
    mockGetUserByIdOrEmail.mockResolvedValue({});
    await expect(
      getUserInfo(userQueryArgsTypeWithIdOnly as UserQueryArgsType)
    ).rejects.toThrow(new NotFoundError("No user founds"));
  });
});

jest.mock("@repositories/userRepository", () => ({
  getUserByIdOrEmail: jest.fn(),
}));

const mockGetUserByIdOrEmail = getUserByIdOrEmail as jest.Mock;
