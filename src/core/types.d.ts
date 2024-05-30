/* eslint-disable */
/**
 * Define all types here
 */
export interface ContextObjectType {
  name: string
  permissons: string[]
}

export type UserQueryArgsType = {
  _id: string
  email: string
}

export interface SystemConfigsType {
  code: string,
  defaultConfigurations: any,
  channelConfigurations: any,
  isActive: true
}

