import { ExceptionModule, HealthModule, LoggerModule } from '@my-events/nestjs-common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { configuration } from './configuration/configuration.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: [`.env.${process.env.NODE_ENV}.local`, `.env.${process.env.NODE_ENV}`],
      isGlobal: true,
      cache: true,
    }),
    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.getOrThrow('rateLimit'),
      inject: [ConfigService],
    }),
    LoggerModule.registerAsync({
      useFactory: (configService: ConfigService) => configService.getOrThrow('logger'),
      inject: [ConfigService],
    }),
    HealthModule.registerAsync({
      useFactory: (configService: ConfigService) => configService.getOrThrow('health'),
      inject: [ConfigService],
    }),
    ExceptionModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
