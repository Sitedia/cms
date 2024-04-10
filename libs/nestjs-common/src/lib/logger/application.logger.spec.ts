import { ApplicationLogger } from './application.logger.js';
import { LogFormat } from './log-format.enum.js';
import { LogLevel } from './log-level.enum.js';

describe('application logger', () => {
  it('should display text in CONSOLE mode', () => {
    expect.assertions(1);
    const logger = new ApplicationLogger({ logLevel: LogLevel.OFF, logFormat: LogFormat.CONSOLE });
    const loggerSpy = jest.spyOn(logger, 'logMessage');
    logger.verbose('Test', 'Context');
    logger.log('Test', 'Context');
    logger.error('Test', 'Context', new Error('Fatal error').stack);
    expect(loggerSpy).toHaveBeenCalledTimes(3);
  });

  it('should display text in JSON mode', () => {
    expect.assertions(1);
    const logger = new ApplicationLogger({ logLevel: LogLevel.OFF, logFormat: LogFormat.JSON });
    const loggerSpy = jest.spyOn(logger, 'logMessage');
    logger.debug('JSON', 'Context');
    logger.error('JSON', 'Context', new Error('Fatal error').stack);
    logger.fatal('JSON', 'Context');
    expect(loggerSpy).toHaveBeenCalledTimes(3);
  });

  it('should display verbose logs according to the level', () => {
    expect.assertions(2);
    const verboseLogger = new ApplicationLogger({ logLevel: LogLevel.VERBOSE });
    expect(verboseLogger.isEnabled(LogLevel.VERBOSE)).toBe(true);
    expect(verboseLogger.isEnabled(LogLevel.FATAL)).toBe(true);
  });

  it('should display debug logs according to the level', () => {
    expect.assertions(2);
    const debugLogger = new ApplicationLogger({ logLevel: LogLevel.DEBUG });
    expect(debugLogger.isEnabled(LogLevel.VERBOSE)).toBe(false);
    expect(debugLogger.isEnabled(LogLevel.FATAL)).toBe(true);
  });

  it('should display nominal logs according to the level', () => {
    expect.assertions(2);
    const logLogger = new ApplicationLogger({ logLevel: LogLevel.LOG });
    expect(logLogger.isEnabled(LogLevel.VERBOSE)).toBe(false);
    expect(logLogger.isEnabled(LogLevel.FATAL)).toBe(true);
  });

  it('should display warn logs according to the level', () => {
    expect.assertions(2);
    const warnLogger = new ApplicationLogger({ logLevel: LogLevel.WARN });
    expect(warnLogger.isEnabled(LogLevel.VERBOSE)).toBe(false);
    expect(warnLogger.isEnabled(LogLevel.FATAL)).toBe(true);
  });

  it('should display error logs according to the level', () => {
    expect.assertions(2);
    const errorLogger = new ApplicationLogger({ logLevel: LogLevel.ERROR });
    expect(errorLogger.isEnabled(LogLevel.VERBOSE)).toBe(false);
    expect(errorLogger.isEnabled(LogLevel.FATAL)).toBe(true);
  });

  it('should display fatal logs according to the level', () => {
    expect.assertions(2);
    const fatalLogger = new ApplicationLogger({ logLevel: LogLevel.FATAL });
    expect(fatalLogger.isEnabled(LogLevel.VERBOSE)).toBe(false);
    expect(fatalLogger.isEnabled(LogLevel.FATAL)).toBe(true);
  });
});
