module.exports = {
  preset: '../../jest.preset.ts',
  displayName: 'backend',
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/index.ts'],
  coverageDirectory: './coverage',
};
