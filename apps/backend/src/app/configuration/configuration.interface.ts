import { HealthModuleOptions, LoggerModuleOptions } from '@my-events/nestjs-common';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

export interface ApplicationModuleOptions {
  version: string;
  port: number;
  basePath: string;
  origin: string;
  apiUrl: string;
}

export interface Configuration {
  application: ApplicationModuleOptions;
  logger: LoggerModuleOptions;
  health: HealthModuleOptions;
  rateLimit: ThrottlerModuleOptions;
}
