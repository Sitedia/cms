export default {
  displayName: 'backend',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json', diagnostics: false }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  setupFilesAfterEnv: [__dirname + '/dotenv.config.js'],
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/index.ts', '!src/main.ts'],
};
