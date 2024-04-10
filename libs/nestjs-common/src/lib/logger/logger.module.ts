import { Global, Module } from '@nestjs/common';
import { ApplicationLogger } from './application.logger.js';
import { ConfigurableModuleClass } from './logger-module.definition.js';

@Global()
@Module({
  providers: [ApplicationLogger],
  exports: [ApplicationLogger],
})
export class LoggerModule extends ConfigurableModuleClass {}
