const { resolve } = require('path');

const root = resolve(__dirname, '..');

const rootConfig = require(`${root}/jest.config.js`);

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  ...rootConfig,
  roots: [root],
  displayName: 'end2end-tests',
  testMatch: ['<rootDir>/tests/functional/**/*.spec.ts'],
  globalSetup: './tests/jest.global-setup.ts',
  globalTeardown: './tests/jest.global-teardown.ts',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts']
};
