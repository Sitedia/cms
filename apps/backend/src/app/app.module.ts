import { CommonModule } from '#libs/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './configuration.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: [`.env.${process.env.NODE_ENV}.local`, `.env.${process.env.NODE_ENV}`],
      isGlobal: true,
      cache: true,
    }),
    CommonModule.registerAsync({
      useFactory: (configService: ConfigService) => configService.getOrThrow('common'),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
