import { LogLevel } from '@nestjs/common';
import { LogFormat } from './log-format.enum.js';

export interface LoggerModuleOptions {
  enabled?: boolean;
  level?: LogLevel;
  format?: LogFormat;
}
