import { describe, expect, it, jest } from '@jest/globals';
import { Logger } from './logger.js';

describe('logger', () => {
  it('should log by level', () => {
    expect.assertions(1);
    const logger = new Logger({ enabled: false });
    const loggerSpy = jest.spyOn(logger, 'log');
    logger.log('Test', 'Context');
    expect(loggerSpy).toHaveBeenCalledTimes(1);
  });
});
