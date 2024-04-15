import { Inject, Injectable, LogLevel } from '@nestjs/common';
import * as clc from 'cli-color';
import { ApplicationLoggerInterface } from './application-logger.interface';
import { LogFormat } from './log-format.enum';
import { MODULE_OPTIONS_TOKEN } from './logger-module.definition';
import { LoggerModuleOptions } from './logger-module.options';

const LEVEL_PAD_INDENT = 7;

@Injectable()
export class ApplicationLogger implements ApplicationLoggerInterface {
  private readonly enabled: boolean;
  private readonly logLevel: LogLevel;
  private readonly logFormat: LogFormat;

  constructor(@Inject(MODULE_OPTIONS_TOKEN) options: LoggerModuleOptions) {
    this.enabled = options.enabled ?? true;
    this.logLevel = options.logLevel ?? 'log';
    this.logFormat = options.logFormat ?? LogFormat.CONSOLE;
    this.verbose(`Logger started with options ${JSON.stringify(options)}`);
  }

  verbose(message: string, context?: string, stack?: string) {
    this.logMessage('verbose', message, context, stack);
  }

  debug(message: string, context?: string, stack?: string) {
    this.logMessage('debug', message, context, stack);
  }

  log(message: string, context?: string, stack?: string) {
    this.logMessage('log', message, context, stack);
  }

  warn(message: string, context?: string, stack?: string) {
    this.logMessage('warn', message, context, stack);
  }

  error(message: string, context?: string, stack?: string) {
    this.logMessage('error', message, context, stack);
  }

  fatal(message: string, context?: string, stack?: string) {
    this.logMessage('fatal', message, context, stack);
  }

  /* istanbul ignore next */
  logMessage(level: LogLevel, message: string, context?: string, stack?: string) {
    if (!this.isEnabled(level)) {
      return;
    } else if (this.logFormat === LogFormat.JSON) {
      this.formatJsonMessage(level, message, context, stack);
    } else {
      this.formatTextMessage(level, message, context, stack);
    }
  }

  isEnabled(level: LogLevel) {
    if (!this.enabled) {
      return false;
    }
    switch (this.logLevel) {
      case 'verbose': {
        return true;
      }
      case 'debug': {
        return ['debug', 'log', 'warn', 'error', 'fatal'].includes(level);
      }
      case 'warn': {
        return ['warn', 'error', 'fatal'].includes(level);
      }
      case 'error': {
        return ['error', 'fatal'].includes(level);
      }
      case 'fatal': {
        return level === 'fatal';
      }
      default: {
        return ['log', 'warn', 'error', 'fatal'].includes(level);
      }
    }
  }

  /* istanbul ignore next */
  protected formatTextMessage(level: LogLevel, message: string, context?: string, stack?: string) {
    const color = this.getColorByLogLevel(level);
    const contextColor = this.getColorByLogLevel('warn');
    const coloredTimestamp = color(new Date().toISOString());
    const coloredLevel = color(level.toLocaleUpperCase().padStart(LEVEL_PAD_INDENT, ' ').slice(0, LEVEL_PAD_INDENT));

    const coloredContext = contextColor(`[${context}]`);
    const coloredMessage = color(message);
    // eslint-disable-next-line no-console
    console.log(`${coloredTimestamp} ${coloredLevel} ${coloredContext} ${coloredMessage}`);
    if (stack) {
      // eslint-disable-next-line no-console
      console.log(stack);
    }
  }

  /* istanbul ignore next */
  protected formatJsonMessage(level: LogLevel, message: string, context?: string, stack?: string) {
    const timestamp = new Date().toISOString();
    const json = { timestamp, level, context, message, stack };
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(json));
  }

  /* istanbul ignore next */
  protected getColorByLogLevel(level: LogLevel) {
    switch (level) {
      case 'verbose': {
        return clc.cyanBright;
      }
      case 'debug': {
        return clc.magentaBright;
      }
      case 'warn': {
        return clc.yellow;
      }
      case 'error': {
        return clc.red;
      }
      case 'fatal': {
        return clc.bold;
      }
      default: {
        return clc.green;
      }
    }
  }
}
