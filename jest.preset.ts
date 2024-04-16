const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  coverageReporters: ['text', 'html'],
  collectCoverageFrom: ['src/**/*.ts', '!src/*.ts'],
};
