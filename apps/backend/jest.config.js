import preset from '../../jest.base.js';

export default {
  ...preset,
  displayName: 'backend',
  setupFilesAfterEnv: ['<rootDir>/dotenv.config.js'],
};
