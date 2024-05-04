import { describe, expect, it, jest } from '@jest/globals';
import { ApplicationLogger } from './application.logger.js';

describe('application logger', () => {
  it('should log by level', () => {
    expect.assertions(1);
    const logger = new ApplicationLogger({ enabled: false });
    const loggerSpy = jest.spyOn(logger, 'logMessage');
    logger.verbose('Test', 'Context');
    logger.debug('Test', 'Context');
    logger.log('Test', 'Context');
    logger.warn('Test', 'Context');
    logger.error('Test', 'Context', new Error('Fatal error').stack);
    logger.fatal('Test', 'Context', new Error('Fatal error').stack);
    expect(loggerSpy).toHaveBeenCalledTimes(6);
  });
});
