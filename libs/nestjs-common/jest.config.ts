module.exports = {
  preset: '../../jest.preset.ts',
  displayName: 'nestjs-common',
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/index.ts'],
  coverageDirectory: './coverage',
};
