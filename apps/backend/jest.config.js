module.exports = {
  displayName: 'nestjs-common',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/main.ts'],
  coverageDirectory: './coverage',
};
