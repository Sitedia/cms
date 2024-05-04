import { describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from '../logger/logger.module.js';
import { HealthController } from './health.controller.js';
import { HealthModule } from './health.module.js';

const setup = async () => {
  const app: TestingModule = await Test.createTestingModule({
    imports: [HealthModule, LoggerModule.register({ enabled: false })],
  }).compile();

  return app.get(HealthController);
};

describe('health endpoint', () => {
  it('should return the liveness status', async () => {
    expect.assertions(1);
    const healthController = await setup();
    const healthCheckStatus = await healthController.liveness();

    expect(healthCheckStatus.status).toBe('ok');
  });

  it('should return the readiness status', async () => {
    expect.assertions(1);
    const healthController = await setup();
    const healthCheckStatus = await healthController.readiness();

    expect(healthCheckStatus.status).toBe('ok');
  });
});
