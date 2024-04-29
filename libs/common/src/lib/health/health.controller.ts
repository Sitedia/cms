import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DiskHealthIndicator, HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { MODULE_OPTIONS_TOKEN } from '../common-module.definition.js';
import { CommonModuleOptions } from '../common-module.options.js';
import { ApplicationLogger } from '../logger/application.logger.js';

const DEFAULT_STORAGE_THRESHOLD_PERCENT = 1;

@ApiTags('probes')
@Controller('probes')
export class HealthController {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private readonly options: CommonModuleOptions,
    private readonly health: HealthCheckService,
    private readonly logger: ApplicationLogger,
    private readonly disk: DiskHealthIndicator,
  ) {
    logger.verbose(`Health check controller started with options ${JSON.stringify(options)}`, ApplicationLogger.name);
  }

  @ApiOperation({
    summary: 'liveness probe',
    description: 'Checks if the instance should be restarted.',
  })
  @Get('liveness')
  @HealthCheck()
  async liveness() {
    const healthCheckResult = await this.health.check([
      () =>
        this.disk.checkStorage('storage', {
          path: '/',
          thresholdPercent: this.options.healthStorageThresholdPercent ?? DEFAULT_STORAGE_THRESHOLD_PERCENT,
        }),
    ]);
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
    const healthCheckResult = await this.health.check([]);
    this.logger.debug(`Status is ${healthCheckResult.status}`, HealthController.name);
    return healthCheckResult;
  }
}
