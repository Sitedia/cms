import preset from '../../jest.base.js';

export default {
  ...preset,
  displayName: 'backend',
  coverageDirectory: '../../coverage/apps/backend',
  setupFilesAfterEnv: ['<rootDir>/dotenv.config.js'],
};
