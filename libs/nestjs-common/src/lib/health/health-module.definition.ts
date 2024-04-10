import { ConfigurableModuleBuilder } from '@nestjs/common';
import { HealthModuleOptions } from './health-module.options.js';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<HealthModuleOptions>().build();
