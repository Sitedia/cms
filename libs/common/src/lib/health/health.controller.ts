import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { ApplicationLogger } from '../logger/application.logger.js';

@ApiTags('probes')
@Controller('probes')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly logger: ApplicationLogger,
  ) {}

  @Get('liveness')
  @HealthCheck()
  async liveness() {
    const healthCheckResult = await this.health.check([]);
    this.logger.debug(`Status is ${healthCheckResult.status}`, HealthController.name);
    return healthCheckResult;
  }

  @Get('readiness')
  @HealthCheck()
  async readiness() {
    const healthCheckResult = await this.health.check([]);
    this.logger.debug(`Status is ${healthCheckResult.status}`, HealthController.name);
    return healthCheckResult;
  }
}
