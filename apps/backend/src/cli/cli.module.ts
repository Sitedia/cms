import { Module } from '@nestjs/common';
import { SwaggerCommand } from './swagger.command';

@Module({
  providers: [SwaggerCommand],
})
export class CliModule {}
