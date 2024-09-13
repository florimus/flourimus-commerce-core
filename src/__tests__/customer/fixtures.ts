import { ContextObjectType, UserType } from "@core/types";
import { PubSub } from "graphql-subscriptions";

export const userWithAllData: UserType = {
  _id: "USR001",
  firstName: "john",
  lastName: "samual",
  email: "john.samual@gmail.com",
  phone: {
    dialCode: "+91",
    number: "989898989",
  },
  role: "ROLE",
  password: "hashed_password",
  loginType: "password",
  lastOnline: "",
  createdAt: "",
  updatedAt: "",
  isActive: true,
  createdBy: "admin",
  updatedBy: "admin",
  metaStatus: "",
  token: "",
};

export const userContextWithRegisteredUser: ContextObjectType = {
  permissions: [],
  pubsub: {} as PubSub,
  isAnonymous: false,
  ...userWithAllData,
};

export const userContextWithAnonymousUser: ContextObjectType = {
  pubsub: {} as PubSub,
  isAnonymous: true,
  _id: "",
  permissions: [],
  firstName: "anonymous",
  lastName: "user",
  email: "anonymous.user@gmail.com",
  role: "customer",
};
