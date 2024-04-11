module.exports = {
  preset: '../../jest.preset.ts',
  displayName: 'nestjs-common',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json', diagnostics: false }],
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/index.ts'],
  coverageDirectory: './coverage',
};
