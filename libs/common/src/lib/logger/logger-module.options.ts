import { LogLevel } from '@nestjs/common';
import { LogFormat } from './application.logger.js';

export interface LoggerModuleOptions {
  level?: LogLevel;
  format?: LogFormat;
}
