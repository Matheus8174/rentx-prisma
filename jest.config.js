const { join } = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  rootDir: __dirname,

  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/src/config/env.ts'],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  displayName: 'unit-tests',
  testMatch: ['<rootDir>/src/modules/**/*.spec.ts'],

  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: join('<rootDir>', compilerOptions.baseUrl)
  })
};
