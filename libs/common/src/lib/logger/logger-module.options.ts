import { LogLevel } from '@nestjs/common';
import { LogFormat } from './logger.js';

export interface LoggerModuleOptions {
  enabled?: boolean;
  level?: LogLevel;
  format?: LogFormat;
}
