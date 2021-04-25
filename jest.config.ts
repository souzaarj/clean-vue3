import type { Config } from '@jest/types'

const esModules = ['@vue/test-utils'].join('|')

const config: Config.InitialOptions = {
  verbose: true,
  roots: ['<rootDir>/__tests__', '<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/components/router/**/*',
    '!<rootDir>/src/**/index.ts',
    '!**/*.d.ts',
  ],

  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'ts', 'tsx', 'vue', 'node'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  moduleNameMapper: {
    '@/tests/(.*)$': '<rootDir>/__tests__/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  testMatch: [
    '**/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],
}

export default config
