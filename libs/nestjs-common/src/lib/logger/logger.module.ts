import { Global, Module } from '@nestjs/common';
import { ApplicationLogger } from './application.logger';
import { ConfigurableModuleClass } from './logger-module.definition';

@Global()
@Module({
  providers: [ApplicationLogger],
  exports: [ApplicationLogger],
})
export class LoggerModule extends ConfigurableModuleClass {}
