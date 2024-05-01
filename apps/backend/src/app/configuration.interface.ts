import { LoggerModuleOptions } from '#libs/common';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

export interface ApplicationModuleOptions {
  name: string;
  description: string;
  version: string;
  port: number;
  basePath: string;
  origin?: string;
  apiUrl: string;
}

export interface Configuration {
  application: ApplicationModuleOptions;
  logger: LoggerModuleOptions;
  rateLimit: ThrottlerModuleOptions;
}
