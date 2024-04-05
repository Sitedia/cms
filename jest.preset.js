const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.base.json');

module.exports = {
  testRegex: ['.*\\.spec\\.ts$', '.*\\.test\\.ts$'],
  transform: { '^.+\\.tsx?$': ['ts-jest'] },
  moduleFileExtensions: ['js', 'json', 'ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/index.ts'],
  coverageThreshold: { global: { lines: 75 } },
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: [__dirname],
};
