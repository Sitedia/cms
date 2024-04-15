export default {
  preset: '../../jest.preset.js',
  displayName: 'backend',
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  setupFilesAfterEnv: ['<rootDir>/dotenv.config.js'],
};
