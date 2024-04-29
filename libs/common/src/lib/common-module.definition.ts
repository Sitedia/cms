import { ConfigurableModuleBuilder } from '@nestjs/common';
import { CommonModuleOptions } from './common-module.options.js';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<CommonModuleOptions>().build();
