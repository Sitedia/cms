import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Logger } from '../logger/logger.js';
import { StatusDTO } from './health-status.dto.js';

@ApiTags('probes')
@Controller('probes')
export class HealthController {
  constructor(private readonly logger: Logger) {}

  @Get('liveness')
  liveness(): StatusDTO {
    this.logger.debug('Status is OK');
    return { status: 'OK' };
  }

  @Get('readiness')
  readiness(): StatusDTO {
    this.logger.debug('Status is OK');
    return { status: 'OK' };
  }
}
