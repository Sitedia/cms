import { LoggerModuleOptions } from '#libs/common';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

export interface BackendModuleOptions {
  version: string;
  port: number;
  basePath: string;
  corsOrigin: string;
}

export interface Options {
  backend: BackendModuleOptions;
  logger: LoggerModuleOptions;
  rateLimit: ThrottlerModuleOptions;
}
