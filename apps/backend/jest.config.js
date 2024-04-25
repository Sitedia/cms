import preset from '../../jest.config.js';

export default {
  ...preset,
  setupFilesAfterEnv: ['<rootDir>/dotenv.config.js'],
};
