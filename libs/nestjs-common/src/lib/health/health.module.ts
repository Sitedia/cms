import { Global, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigurableModuleClass } from './health-module.definition.js';
import { HealthController } from './health.controller.js';

@Global()
@Module({
  imports: [TerminusModule.forRoot({ logger: false })],
  controllers: [HealthController],
})
export class HealthModule extends ConfigurableModuleClass {}
