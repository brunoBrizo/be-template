/* eslint-disable @typescript-eslint/no-var-requires */
const testConfig = require('../jest.config.js');

module.exports = {
  ...testConfig,
  testRegex: '/src/.*.spec.ts',
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: './test/coverage/',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.node/',
    '/jest/',
    'src/main.ts',
    'src/common/config/',
  ],
  collectCoverageFrom: ['src/**'],
};
