module.exports = {
  displayName: 'backend',
  preset: '../../jest.preset.ts',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json', diagnostics: false }],
  },
  transformIgnorePatterns: ['^.+\\.js$'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/*.ts', '!src/cli/**'],
  coverageDirectory: './coverage',
  setupFilesAfterEnv: [__dirname + '/dotenv.config.js'],
};
