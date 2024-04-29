import { CommonModuleOptions } from '#libs/common';

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
  common: CommonModuleOptions;
}
