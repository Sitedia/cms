import { ConsoleLogger, Inject, Injectable, LogLevel } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './logger-module.definition.js';
import { LoggerModuleOptions } from './logger-module.options.js';

export enum LogFormat {
  CONSOLE = 'CONSOLE',
  JSON = 'JSON',
}

/** Logger with dual mode : text or JSON */
@Injectable()
export class Logger extends ConsoleLogger {
  private readonly format: LogFormat;

  constructor(@Inject(MODULE_OPTIONS_TOKEN) options: LoggerModuleOptions) {
    super();
    /* istanbul ignore next */
    this.setLogLevels([options.level ?? 'log']);
    this.format = options.format ?? LogFormat.CONSOLE;
  }

  /* istanbul ignore next */
  protected override printMessages(
    messages: unknown[],
    context?: string | undefined,
    logLevel?: LogLevel | undefined,
    writeStreamType?: 'stdout' | 'stderr' | undefined,
  ): void {
    if (!super.isLevelEnabled(logLevel ?? 'log')) {
      return;
    }
    if (this.format === LogFormat.CONSOLE) {
      super.printMessages(messages, context, logLevel, writeStreamType);
    } else {
      // Display the log in JSON format
      messages.map((message) => {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify({ timestamp: super.getTimestamp(), logLevel, message, context }));
      });
    }
  }
}
