export default {
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testRegex: ['.*\\.spec\\.ts$'],
  transform: {
    '^.+\\.(ts|js)$': [
      'ts-jest',
      { tsconfig: import.meta.dirname + '/tsconfig.json', diagnostics: { ignoreCodes: ['TS151001'] } },
    ],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // remove '.js' extensions for local resolution in ESM mode
    '#libs/(.*)': ['libs/$1/src'], // add alias which is in tsconfig.base.json for local resolution in ESM mode
  },
  modulePaths: [import.meta.dirname],
  collectCoverageFrom: ['**/src/**/*.ts', '!**/src/*.ts'],
  coverageThreshold: { global: { lines: 75 } },
};
