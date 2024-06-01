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

export type TokenQueryArgsType = {
  tokenRequestInput: {
    email?: string;
    password?: string;
    grandType?: "password" | "google";
    externalToken?: string;
  }
};

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
  phone: PhoneType;
  role: string;
  password?: string;
  loginType: string;
  lastOnline: string;
  createdAt?: string;
  updatedAt?: string;
  isActive?: Boolean;
  createdBy?: string;
  updatedBy?: string;
  metaStatus?: string;
}
