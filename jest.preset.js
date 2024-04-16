export default {
  testRegex: ['.*\\.spec\\.ts$'],
  transform: {
    '^.+\\.(ts|js)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Remove '.js' extensions in ESM mode for local path resolution
    '#libs/(.*)': ['<rootDir>../../libs/$1/src'],
  },
  modulePaths: [import.meta.dirname],
  collectCoverageFrom: ['src/**/*.ts', '!src/*.ts'],
  coverageThreshold: { global: { lines: 75 } },
};
