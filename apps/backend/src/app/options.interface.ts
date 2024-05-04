import { LoggerModuleOptions } from '#libs/common';

export interface BackendModuleOptions {
  version: string;
  port: number;
  basePath: string;
  corsOrigin: string;
}

export interface Options {
  backend: BackendModuleOptions;
  logger: LoggerModuleOptions;
}
