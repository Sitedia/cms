import { DynamicModule, Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ASYNC_OPTIONS_TYPE, ConfigurableModuleClass, OPTIONS_TYPE } from './common-module.definition.js';
import { ApplicationExceptionFilter } from './exception/application-exception.filter.js';
import { HealthController } from './health/health.controller.js';
import { ApplicationLogger } from './logger/application.logger.js';
import { RequestInterceptor } from './request-interceptor/request.interceptor.js';

@Global()
@Module({
  imports: [TerminusModule.forRoot({ logger: false })],
  providers: [
    ApplicationLogger,
    { provide: APP_INTERCEPTOR, useClass: RequestInterceptor },
    { provide: APP_FILTER, useClass: ApplicationExceptionFilter },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
  controllers: [HealthController],
})
export class CommonModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      ...super.register(options),
      imports: [ThrottlerModule.forRoot(options.rateLimit)],
    };
  }
  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      ...super.registerAsync(options),
      imports: [
        ThrottlerModule.forRootAsync({
          useFactory: async (inject) => {
            const asyncOptions = await options.useFactory?.(inject);
            return asyncOptions?.rateLimit ?? [];
          },
          inject: options.inject,
        }),
      ],
    };
  }
}
