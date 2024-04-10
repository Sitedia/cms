import { ExceptionModule, HealthModule, LoggerModule } from '@my-events/nestjs-common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import * as Joi from 'joi';
import { ConfigurationOptions } from './configuration/configuration.interface.js';
import { configuration } from './configuration/configuration.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: [`.env.${process.env.NODE_ENV}.local`, `.env.${process.env.NODE_ENV}`],
      validationSchema: Joi.object({ NODE_ENV: Joi.string().valid('development', 'test') }),
      isGlobal: true,
      cache: true,
    }),
    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.getOrThrow(ConfigurationOptions.RATE_LIMIT),
      inject: [ConfigService],
    }),
    LoggerModule.registerAsync({
      useFactory: (configService: ConfigService) => configService.getOrThrow(ConfigurationOptions.LOGGER),
      inject: [ConfigService],
    }),
    HealthModule.registerAsync({
      useFactory: (configService: ConfigService) => configService.getOrThrow(ConfigurationOptions.HEALTH),
      inject: [ConfigService],
    }),
    ExceptionModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
