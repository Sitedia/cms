module.exports = {
  resolver: '@nx/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'mjs', 'html'],
  modulePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/coverage'],
  coverageReporters: ['text', 'html'],
  collectCoverageFrom: ['src/**/*.ts', '!src/*.ts'],
  transform: { '^.+\\.(ts|js)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json', diagnostics: false }] },
};
