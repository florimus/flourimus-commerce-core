/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/__tests__/**/_*.test.ts"],
  moduleNameMapper: {
    "^@errors/(.*)$": "<rootDir>/src/core/errors/$1",
    "^@context/(.*)$": "<rootDir>/src/context/$1",
    "^@services/(.*)$": "<rootDir>/src/service/$1",
    "^@repositories/(.*)$": "<rootDir>/src/repository/$1",
    "^@resolvers/(.*)$": "<rootDir>/src/resolvers/$1",
    "^@permissions/(.*)$": "<rootDir>/src/permissions/$1",
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@schemas/(.*)$": "<rootDir>/src/schemas/$1",
    "^@types$": "<rootDir>/src/core/types.d.ts",
    "^@config$": "<rootDir>/config.ts",
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  moduleDirectories: ["node_modules", "src"],
};
