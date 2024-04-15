import { describe, expect, it, jest } from '@jest/globals';
import { ApplicationLogger } from './application.logger';
import { LogFormat } from './log-format.enum';

describe('application logger', () => {
  it('should display text in CONSOLE mode', () => {
    expect.assertions(1);
    const logger = new ApplicationLogger({ enabled: false, logFormat: LogFormat.CONSOLE });
    const loggerSpy = jest.spyOn(logger, 'logMessage');
    logger.verbose('Test', 'Context');
    logger.log('Test', 'Context');
    logger.error('Test', 'Context', new Error('Fatal error').stack);
    expect(loggerSpy).toHaveBeenCalledTimes(3);
  });

  it('should display text in JSON mode', () => {
    expect.assertions(1);
    const logger = new ApplicationLogger({ enabled: false, logFormat: LogFormat.JSON });
    const loggerSpy = jest.spyOn(logger, 'logMessage');
    logger.debug('JSON', 'Context');
    logger.error('JSON', 'Context', new Error('Fatal error').stack);
    logger.fatal('JSON', 'Context');
    expect(loggerSpy).toHaveBeenCalledTimes(3);
  });

  it('should display verbose logs according to the level', () => {
    expect.assertions(2);
    const verboseLogger = new ApplicationLogger({ logLevel: 'verbose' });
    expect(verboseLogger.isEnabled('verbose')).toBe(true);
    expect(verboseLogger.isEnabled('fatal')).toBe(true);
  });

  it('should display debug logs according to the level', () => {
    expect.assertions(2);
    const debugLogger = new ApplicationLogger({ logLevel: 'debug' });
    expect(debugLogger.isEnabled('verbose')).toBe(false);
    expect(debugLogger.isEnabled('fatal')).toBe(true);
  });

  it('should display nominal logs according to the level', () => {
    expect.assertions(2);
    const logLogger = new ApplicationLogger({ logLevel: 'log' });
    expect(logLogger.isEnabled('verbose')).toBe(false);
    expect(logLogger.isEnabled('fatal')).toBe(true);
  });

  it('should display warn logs according to the level', () => {
    expect.assertions(2);
    const warnLogger = new ApplicationLogger({ logLevel: 'warn' });
    expect(warnLogger.isEnabled('verbose')).toBe(false);
    expect(warnLogger.isEnabled('fatal')).toBe(true);
  });

  it('should display error logs according to the level', () => {
    expect.assertions(2);
    const errorLogger = new ApplicationLogger({ logLevel: 'error' });
    expect(errorLogger.isEnabled('verbose')).toBe(false);
    expect(errorLogger.isEnabled('fatal')).toBe(true);
  });

  it('should display fatal logs according to the level', () => {
    expect.assertions(2);
    const fatalLogger = new ApplicationLogger({ logLevel: 'fatal' });
    expect(fatalLogger.isEnabled('verbose')).toBe(false);
    expect(fatalLogger.isEnabled('fatal')).toBe(true);
  });
});
