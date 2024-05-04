import { HealthModule, LoggerModule } from '#libs/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { options } from './options.js';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [options], isGlobal: true }),
    LoggerModule.registerAsync({
      useFactory: (config: ConfigService) => config.getOrThrow('logger'),
      inject: [ConfigService],
    }),
    HealthModule,
  ],
})
export class AppModule {}
