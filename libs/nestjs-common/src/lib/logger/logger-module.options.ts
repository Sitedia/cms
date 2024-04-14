import { LogFormat } from './log-format.enum';
import { LogLevel } from './log-level.enum';

export interface LoggerModuleOptions {
  logLevel?: LogLevel;
  logFormat?: LogFormat;
}
