import { LogLevel } from '@nestjs/common';
import { LogFormat } from './application.logger.js';

export interface LoggerModuleOptions {
  enabled?: boolean;
  level?: LogLevel;
  format?: LogFormat;
}
