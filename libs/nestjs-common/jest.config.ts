module.exports = {
  displayName: 'nestjs-common',
  preset: '../../jest.preset.ts',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json', diagnostics: false }],
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/index.ts'],
  coverageDirectory: './coverage',
};
