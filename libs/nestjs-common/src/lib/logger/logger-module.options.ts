import { LogLevel } from '@nestjs/common';
import { LogFormat } from './log-format.enum';

export interface LoggerModuleOptions {
  enabled?: boolean;
  level?: LogLevel;
  format?: LogFormat;
}
