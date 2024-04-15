import { LogLevel } from '@nestjs/common';
import { LogFormat } from './log-format.enum';

export interface LoggerModuleOptions {
  enabled?: boolean;
  logLevel?: LogLevel;
  logFormat?: LogFormat;
}
