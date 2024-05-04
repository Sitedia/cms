import { Global, Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './logger-module.definition.js';
import { Logger } from './logger.js';

@Global()
@Module({
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule extends ConfigurableModuleClass {}
