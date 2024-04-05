module.exports = {
  displayName: 'backend',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/*.ts', '!src/cli/**'],
  coverageDirectory: './coverage',
};
