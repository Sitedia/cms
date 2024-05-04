import { LoggerService } from '@nestjs/common';

/** Enforced methods for the NestJS logger */
export interface LoggerInterface extends LoggerService {
  verbose(message: string, context: string, stack?: string): void;
  debug(message: string, context: string, stack?: string): void;
  log(message: string, context: string, stack?: string): void;
  warn(message: string, context: string, stack?: string): void;
  error(message: string, context: string, stack?: string): void;
  fatal(message: string, context: string, stack?: string): void;
}
