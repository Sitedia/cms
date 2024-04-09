module.exports = {
  displayName: 'backend',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json', diagnostics: { ignoreCodes: [151001] } }],
  },
  transformIgnorePatterns: ['^.+\\.js$'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/*.ts', '!src/cli/**'],
  coverageDirectory: './coverage',
  setupFilesAfterEnv: [__dirname + '/dotenv.config.js'],
};
