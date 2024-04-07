import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DiskHealthIndicator, HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { ApplicationLogger } from '../logger/application.logger';
import { MODULE_OPTIONS_TOKEN } from './health-module.definition';
import { HealthModuleOptions } from './health-module.options';

@ApiTags('probes')
@Controller('probes')
export class HealthController {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private readonly options: HealthModuleOptions,
    private readonly health: HealthCheckService,
    private readonly logger: ApplicationLogger,
    private readonly disk: DiskHealthIndicator,
  ) {}

  @ApiOperation({
    summary: 'liveness probe',
    description: 'Checks if the instance should be restarted.',
  })
  @Get('liveness')
  @HealthCheck()
  async liveness() {
    const healthCheckResult = await this.health.check([]);
    this.logger.debug(`Status is ${healthCheckResult.status}`, HealthController.name);
    return healthCheckResult;
  }

  @ApiOperation({
    summary: 'readiness probe',
    description: 'Checks if the instance is able to handle requests.',
  })
  @Get('readiness')
  @HealthCheck()
  async readiness() {
    const healthCheckResult = await this.health.check([
      () => this.disk.checkStorage('storage', { path: '/', thresholdPercent: this.options.storageThresholdPercent }),
    ]);
    this.logger.debug(`Status is ${healthCheckResult.status}`, HealthController.name);
    return healthCheckResult;
  }
}
