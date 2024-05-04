import { LogLevel } from '@nestjs/common';

export interface LoggerModuleOptions {
  level?: LogLevel;
  json?: boolean;
}
