import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Logger } from '../logger/logger.js';
import { HealthStatusDTO } from './health-status.dto.js';

@ApiTags('probes')
@Controller('probes')
export class HealthController {
  constructor(private readonly logger: Logger) {}

  @ApiResponse({ type: HealthStatusDTO })
  @Get('liveness')
  liveness(): HealthStatusDTO {
    this.logger.debug('Status is OK');
    return { status: 'OK' };
  }

  @Get('readiness')
  readiness(): HealthStatusDTO {
    this.logger.debug('Status is OK');
    return { status: 'OK' };
  }
}
