import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }],
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@Routes/(.*)$': '<rootDir>/src/routes/$1',
    '@Middlewares/(.*)': '<rootDir>/src/middlewares/$1',
    '@Models/(.*)': '<rootDir>/src/models/$1',
    '@Errors/(.*)': '<rootDir>/src/errors/$1',
    '@Services/(.*)': '<rootDir>/src/services/$1',
    '@Test/(.*)': '<rootDir>/src/test/$1',
  },
   testPathIgnorePatterns: ['/node_modules/', '/dist/'],
   setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

export default config;
