/* eslint-disable no-console */
import { Inject, Injectable } from '@nestjs/common';
import clc from 'cli-color';
import { ApplicationLoggerInterface } from './application-logger.interface';
import { LogFormat } from './log-format.enum';
import { LogLevel } from './log-level.enum';
import { MODULE_OPTIONS_TOKEN } from './logger-module.definition';
import { LoggerModuleOptions } from './logger-module.options';

const LEVEL_PAD_INDENT = 7;

@Injectable()
export class ApplicationLogger implements ApplicationLoggerInterface {
  private readonly logLevel: LogLevel;
  private readonly logFormat: LogFormat;

  constructor(@Inject(MODULE_OPTIONS_TOKEN) options: LoggerModuleOptions) {
    this.logLevel = options.logLevel || LogLevel.LOG;
    this.logFormat = options.logFormat ?? LogFormat.CONSOLE;
  }

  verbose(message: string, context?: string, stack?: string) {
    this.logMessage(LogLevel.VERBOSE, message, context, stack);
  }

  debug(message: string, context?: string, stack?: string) {
    this.logMessage(LogLevel.DEBUG, message, context, stack);
  }

  log(message: string, context?: string, stack?: string) {
    this.logMessage(LogLevel.LOG, message, context, stack);
  }

  warn(message: string, context?: string, stack?: string) {
    this.logMessage(LogLevel.WARN, message, context, stack);
  }

  error(message: string, context?: string, stack?: string) {
    this.logMessage(LogLevel.ERROR, message, context, stack);
  }

  fatal(message: string, context?: string, stack?: string) {
    this.logMessage(LogLevel.FATAL, message, context, stack);
  }

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
    switch (this.logLevel) {
      case LogLevel.VERBOSE: {
        return true;
      }
      case LogLevel.DEBUG: {
        return [LogLevel.DEBUG, LogLevel.LOG, LogLevel.WARN, LogLevel.ERROR, LogLevel.FATAL].includes(level);
      }
      case LogLevel.WARN: {
        return [LogLevel.WARN, LogLevel.ERROR, LogLevel.FATAL].includes(level);
      }
      case LogLevel.ERROR: {
        return [LogLevel.ERROR, LogLevel.FATAL].includes(level);
      }
      case LogLevel.FATAL: {
        return level === LogLevel.FATAL;
      }
      case LogLevel.OFF: {
        return false;
      }
      default: {
        return [LogLevel.LOG, LogLevel.WARN, LogLevel.ERROR, LogLevel.FATAL].includes(level);
      }
    }
  }

  protected formatTextMessage(level: LogLevel, message: string, context?: string, stack?: string) {
    const color = this.getColorByLogLevel(level);
    const contextColor = this.getColorByLogLevel(LogLevel.WARN);
    const coloredTimestamp = color(new Date().toISOString());
    const coloredLevel = color(level.toLocaleUpperCase().padStart(LEVEL_PAD_INDENT, ' ').slice(0, LEVEL_PAD_INDENT));

    const coloredContext = contextColor(`[${context}]`);
    const coloredMessage = color(message);
    console.log(`${coloredTimestamp} ${coloredLevel} ${coloredContext} ${coloredMessage}`);
    if (stack) {
      console.log(stack);
    }
  }

  protected formatJsonMessage(level: LogLevel, message: string, context?: string, stack?: string) {
    const timestamp = new Date().toISOString();
    const json = { timestamp, level, context, message, stack };
    console.log(JSON.stringify(json));
  }

  protected getColorByLogLevel(level: LogLevel) {
    switch (level) {
      case LogLevel.VERBOSE: {
        return clc.cyanBright;
      }
      case LogLevel.DEBUG: {
        return clc.magentaBright;
      }
      case LogLevel.WARN: {
        return clc.yellow;
      }
      case LogLevel.ERROR: {
        return clc.red;
      }
      case LogLevel.FATAL: {
        return clc.bold;
      }
      default: {
        return clc.green;
      }
    }
  }
}
