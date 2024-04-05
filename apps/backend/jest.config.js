module.exports = {
  displayName: 'nestjs-common',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  coverageDirectory: './coverage',
};
