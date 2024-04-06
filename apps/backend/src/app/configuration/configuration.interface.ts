import { HealthModuleOptions, LoggerModuleOptions } from '@my-events/nestjs-common';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

export enum ConfigurationOptions {
  APPLICATION = 'application',
  LOGGER = 'logger',
  RATE_LIMIT = 'rateLimit',
  HEALTH = 'health',
}

export interface ApplicationOptions {
  version: string;
  port: number;
  basePath: string;
  origin: string;
  apiUrl: string;
}

export interface Configuration {
  application: ApplicationOptions;
  logger: LoggerModuleOptions;
  health: HealthModuleOptions;
  rateLimit: ThrottlerModuleOptions;
}
