import { HealthModule, LoggerModule } from '#libs/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { options } from './options.js';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [options], isGlobal: true }),
    LoggerModule.registerAsync({
      useFactory: (config: ConfigService) => config.getOrThrow('logger'),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      useFactory: async (config: ConfigService) => config.getOrThrow('rateLimit'),
      inject: [ConfigService],
    }),
    HealthModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
