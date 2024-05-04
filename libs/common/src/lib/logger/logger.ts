// eslint-disable-next-line no-console
import { ConsoleLogger, Inject, Injectable, LogLevel } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './logger-module.definition.js';
import { LoggerModuleOptions } from './logger-module.options.js';

/** Logger with JSON format option */
/* istanbul ignore next */
@Injectable()
export class Logger extends ConsoleLogger {
  constructor(@Inject(MODULE_OPTIONS_TOKEN) readonly loggerOptions: LoggerModuleOptions) {
    super('', { logLevels: [loggerOptions.level ?? 'log'] });
  }

  protected override printMessages(messages: unknown[], context?: string, logLevel: LogLevel = 'log', writeStreamType?: 'stdout' | 'stderr') {
    if (this.loggerOptions.json) {
      messages.map((message) => console.log(JSON.stringify({ timestamp: super.getTimestamp(), logLevel, message, context })));
    } else {
      super.printMessages(messages, context, logLevel, writeStreamType);
    }
  }
}
