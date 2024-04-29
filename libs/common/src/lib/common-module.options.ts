import { LogLevel } from '@nestjs/common';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { LogFormat } from './logger/application.logger.js';

export interface CommonModuleOptions {
  logsEnabled?: boolean;
  logLevel?: LogLevel;
  logFormat?: LogFormat;
  healthStorageThresholdPercent?: number;
  rateLimit?: ThrottlerModuleOptions;
}
