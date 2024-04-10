import { LogFormat } from './log-format.enum.js';
import { LogLevel } from './log-level.enum.js';

export interface LoggerModuleOptions {
  logLevel?: LogLevel;
  logFormat?: LogFormat;
}
