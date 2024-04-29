import { describe, expect, it, jest } from '@jest/globals';
import { ApplicationLogger, LogFormat } from './application.logger.js';

describe('application logger', () => {
  it('should display text in CONSOLE mode', () => {
    expect.assertions(1);
    const logger = new ApplicationLogger({ logsEnabled: false, logFormat: LogFormat.CONSOLE });
    const loggerSpy = jest.spyOn(logger, 'logMessage');
    logger.verbose('Test', 'Context');
    logger.log('Test', 'Context');
    logger.error('Test', 'Context', new Error('Fatal error').stack);
    expect(loggerSpy).toHaveBeenCalledTimes(3);
  });

  it('should display text in JSON mode', () => {
    expect.assertions(1);
    const logger = new ApplicationLogger({ logsEnabled: false, logFormat: LogFormat.JSON });
    const loggerSpy = jest.spyOn(logger, 'logMessage');
    logger.debug('JSON', 'Context');
    logger.error('JSON', 'Context', new Error('Fatal error').stack);
    logger.fatal('JSON', 'Context');
    expect(loggerSpy).toHaveBeenCalledTimes(3);
  });
});
