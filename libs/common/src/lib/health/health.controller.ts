import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Logger } from '../logger/logger.js';
import { OwaspResponse } from '../swagger/owasp-response.js';
import { HealthStatusDTO } from './health-status.dto.js';

@ApiTags('probes')
@Controller('probes')
export class HealthController {
  constructor(private readonly logger: Logger) {}

  @OwaspResponse({ type: HealthStatusDTO, description: 'checks if the instance should be restarted' })
  @Get('liveness')
  liveness(): HealthStatusDTO {
    this.logger.debug('Status is OK');
    return { status: 'OK' };
  }

  @OwaspResponse({ type: HealthStatusDTO, description: 'checks if the instance is ready to respond' })
  @Get('readiness')
  readiness(): HealthStatusDTO {
    this.logger.debug('Status is OK');
    return { status: 'OK' };
  }
}
