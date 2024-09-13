export const getUserInfo_description = `
/**
 * Controller used to get user
 * @param args
 * @returns Promise<UserType>
 * 
 * const getUserInfo: (args: UserQueryArgsType) => Promise<UserType>
 */
`;

export const getCurrentUserInfo_description = `
/**
 * Controller used to get current user
 * @param args
 * @returns
 * 
 * const getCurrentUserInfo: (context: ContextObjectType) => Promise<ContextObjectType>
 */
`;

export const VERIFY_USER_INFO_WITH_VALID_EMAIL = "Verify user info with valid email only";
export const VERIFY_USER_INFO_WITH_VALID_ID = "Verify user info with valid _id only";
export const VERIFY_USER_INFO_WITH_INVALID_ID = "Verify user info with invalid _id only";
export const VERIFY_USER_INFO_WITH_INVALID_EMAIL = "Verify user info with invalid email only";
export const VERIFY_USER_CONTEXT_WITH_LOGIN_UESR = "Verify user context for logined user";
export const VERIFY_USER_CONTEXT_WITH_ANONYMOUS_UESR = "Verify user context for anonymous user";
