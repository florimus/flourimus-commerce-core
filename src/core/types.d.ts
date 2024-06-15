/* eslint-disable */
/**
 * Define all types here
 */
export interface ContextObjectType extends UserType {
  permissions: string[];
}

export type UserQueryArgsType = {
  _id: string;
  email: string;
};

export type VerifyInvitationQueryArgsType = {
  token: string;
};

export type TokenQueryArgsType = {
  tokenRequestInput: {
    email?: string;
    password?: string;
    grandType?: "password" | "google" | "anonymous";
    externalToken?: string;
  }
};

export type RefreshQueryArgsType = {
  token: string;
};

export type InviteStaffMutationArgsType = {
  inviteStaffInput: {
    email: string;
    role: string;
    firstName: string;
    lastName: string;
  }
}

export type OnboardStaffMutationArgsType = {
  onboardStaffInput: {
    _id: string;
    firstName: string;
    lastName: string;
    password: string
    loginType: string;
    token: string;
  }
}

export type ForgotPasswordMutationArgsType = {
  email: string;
}

export type ResetPasswordMutationArgsType = {
  resetPasswordInput: {
    token: string;
    password: string;
  }
}

export type ProductArgsType = {
  _id: string;
};

export type CreateProductArgsType = {
  productCreateInput: {
    name: string;
    parentId: string;
    category: string;
    brand: string;
    isVariant: boolean;
    medias: [string];
    isSellable: boolean;
  }
};

export type TokenType =
  | "register-access"
  | "register-refresh"
  | "anonymous-access"
  | "anonymous-refresh";

export type TokenPayloadType = Partial<UserType> & { type: TokenType }

export interface SystemConfigsType {
  code: string;
  defaultConfigurations: any;
  channelConfigurations: any;
  isActive: true;
}

export interface PhoneType {
  dialCode: string;
  number: string;
}

export interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: PhoneType;
  role: string;
  password?: string;
  loginType?: string;
  lastOnline?: string;
  createdAt?: string;
  updatedAt?: string;
  isActive?: Boolean;
  createdBy?: string;
  updatedBy?: string;
  metaStatus?: string;
  token?: string;
}

export interface ProductType {
  _id: string;
  name: string;
  medias: [string];
  parentId: string;
  category: string;
  brand: string;
  haveVariants: boolean;
  isVariant: boolean;
  isSellable: boolean;
  variantInfo?: [string]
  createdAt?: string;
  updatedAt?: string;
  isActive?: Boolean;
  createdBy?: string;
  updatedBy?: string;
  metaStatus?: string;
}

export interface BasicDBEmailConfig {
  from: string;
  name: string;
  templateId: string;
}
