export default {
  testRegex: ['.*\\.spec\\.ts$'],
  transform: {
    '^.+\\.(ts|js)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Remove '.js' extensions for local resolution in ESM mode
    '#libs/(.*)': ['<rootDir>../../libs/$1/src'], // Add alias from tsconfig.base.json for local resolution in ESM mode
  },
  modulePaths: [import.meta.dirname],
  collectCoverageFrom: ['src/**/*.ts', '!src/*.ts'],
  coverageThreshold: { global: { lines: 75 } },
};
