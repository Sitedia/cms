import { Module } from '@nestjs/common';
import 'tslib';
import { SwaggerCommand } from './commands/swagger.command';

@Module({
  providers: [SwaggerCommand],
})
export class CliModule {}
