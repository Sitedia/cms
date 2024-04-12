module.exports = {
  preset: '../../jest.preset.js',
  displayName: 'backend',
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/index.ts'],
  coverageDirectory: './coverage',
};
