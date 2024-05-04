import { ConsoleLogger, Inject, Injectable, LogLevel } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './logger-module.definition.js';
import { LoggerModuleOptions } from './logger-module.options.js';
import { LoggerInterface } from './logger.interface.js';

export enum LogFormat {
  CONSOLE = 'CONSOLE',
  JSON = 'JSON',
}

/** Logger with dual mode : text or JSON */
@Injectable()
export class Logger extends ConsoleLogger implements LoggerInterface {
  private readonly format: LogFormat;

  constructor(@Inject(MODULE_OPTIONS_TOKEN) options: LoggerModuleOptions) {
    super();
    /* istanbul ignore next */
    if (options.enabled === undefined || options.enabled) {
      this.setLogLevels([options.level ?? 'log']);
    } else {
      this.setLogLevels([]);
    }
    this.format = options.format ?? LogFormat.CONSOLE;
  }

  override verbose(message: string, context: string, stack?: string) {
    this.logMessage('verbose', message, context, stack);
  }

  override debug(message: string, context: string, stack?: string) {
    this.logMessage('debug', message, context, stack);
  }

  override log(message: string, context: string, stack?: string) {
    this.logMessage('log', message, context, stack);
  }

  override warn(message: string, context: string, stack?: string) {
    this.logMessage('warn', message, context, stack);
  }

  override error(message: string, context: string, stack?: string) {
    this.logMessage('error', message, context, stack);
  }

  override fatal(message: string, context: string, stack?: string) {
    this.logMessage('fatal', message, context, stack);
  }

  /* istanbul ignore next */
  logMessage(level: LogLevel, message: string, context?: string, stack?: string) {
    if (!super.isLevelEnabled(level)) {
      return;
    }
    if (this.format === LogFormat.CONSOLE) {
      super.printMessages([message], context, level);
    } else {
      // Display the log in JSON format
      // eslint-disable-next-line no-console
      console.log(JSON.stringify({ timestamp: super.getTimestamp(), level, context, message, stack }));
    }
  }
}