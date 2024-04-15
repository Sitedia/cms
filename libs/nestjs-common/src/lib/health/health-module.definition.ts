import { ConfigurableModuleBuilder } from '@nestjs/common';
import { HealthModuleOptions } from './health-module.options';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<HealthModuleOptions>().build();
