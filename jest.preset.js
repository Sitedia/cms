module.exports = {
  resolver: '@nx/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'mjs', 'html'],
  coverageReporters: ['text', 'html'],
  collectCoverageFrom: ['src/**/*.ts', '!src/*.ts'],
  transform: { '^.+\\.(ts|js|html)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json', diagnostics: false }] },
  testEnvironment: 'node',
  testEnvironmentOptions: { customExportConditions: ['node', 'require', 'default'] },
};
