
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  roots: ["<rootDir>/tests"],
  collectCoverageFrom: [
      "<rootDir>/src/**/*.ts",
       "!<rootDir>/src/main/**/*",
      "!<rootDir>/src/presentation/components/router/**/*",
      "!<rootDir>/src/**/index.ts",
      "!**/*.d.ts"
    ],
    coverageDirectory: "coverage",
    moduleFileExtensions: ["js", "json", "ts", "vue"],
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.ts$": "ts-jest",
      // ".*\\.(vue)$": "vue-jest"
    },
    moduleNameMapper: {
      "@/tests/(.*)": "<rootDir>/tests/$1",
      "@/(.*)": "<rootDir>/src/$1",
      "\\.scss$": "identity-obj-proxy"
    },
    testMatch: [
      "**/tests/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
    ],
  }
