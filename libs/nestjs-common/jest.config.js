module.exports = {
  preset: '../../jest.preset.js',
  displayName: 'nestjs-common',
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/index.ts'],
  coverageDirectory: './coverage',
};
