const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.base.json');

module.exports = {
  testMatch: ['**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js'],
  coverageReporters: ['text', 'html'],
  transform: { '^.+\\.(ts|js|html)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }] },
  testEnvironmentOptions: { customExportConditions: ['node', 'require', 'default'] },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: [__dirname],
};
