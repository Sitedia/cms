import { ConsoleLogger, Inject, Injectable, LogLevel } from '@nestjs/common';
import { ApplicationLoggerInterface } from './application-logger.interface.js';
import { MODULE_OPTIONS_TOKEN } from './logger-module.definition.js';
import { LoggerModuleOptions } from './logger-module.options.js';

const orderedLevels: LogLevel[] = ['verbose', 'debug', 'log', 'warn', 'error', 'fatal'];

export enum LogFormat {
  CONSOLE = 'CONSOLE',
  JSON = 'JSON',
}

/** Logger with dual mode : text or JSON */
@Injectable()
export class ApplicationLogger extends ConsoleLogger implements ApplicationLoggerInterface {
  private readonly enabled: boolean;
  private readonly level: LogLevel;
  private readonly format: LogFormat;

  constructor(@Inject(MODULE_OPTIONS_TOKEN) options: LoggerModuleOptions) {
    super();
    /* istanbul ignore next */
    this.enabled = options.enabled ?? true;
    this.level = options.level ?? 'log';
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
    if (!this.isEnabled(level)) {
      return;
    } else if (this.format === LogFormat.JSON) {
      this.formatJsonMessage(level, message, context, stack);
    } else {
      super.printMessages([message], context, level);
    }
  }

  /* istanbul ignore next */
  isEnabled(level: LogLevel) {
    return this.enabled ? orderedLevels.slice(orderedLevels.indexOf(this.level)).includes(level) : false;
  }

  /* istanbul ignore next */
  protected formatJsonMessage(level: LogLevel, message: string, context?: string, stack?: string) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify({ timestamp: super.getTimestamp(), level, context, message, stack }));
  }
}
