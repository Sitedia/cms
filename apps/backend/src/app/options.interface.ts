import { LoggerModuleOptions } from '#libs/common';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface BackendModuleOptions {
  version: string;
  port: number;
  basePath: string;
  corsOrigin: string;
}

export interface Options {
  backend: BackendModuleOptions;
  logger: LoggerModuleOptions;
  throttler: ThrottlerModuleOptions;
  typeorm: TypeOrmModuleOptions;
}
