import { HealthModuleOptions, LoggerModuleOptions } from '#libs/nestjs-common';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

export interface ApplicationModuleOptions {
  version: string;
  port: number;
  basePath: string;
  origin?: string;
  apiUrl: string;
}

/** Expected structure of the NestJS configuration */
export interface Configuration {
  application: ApplicationModuleOptions;
  logger: LoggerModuleOptions;
  health: HealthModuleOptions;
  rateLimit: ThrottlerModuleOptions;
}
