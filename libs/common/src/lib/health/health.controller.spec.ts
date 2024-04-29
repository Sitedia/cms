import { describe, expect, it } from '@jest/globals';
import { ServiceUnavailableException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CommonModule } from '../common.module.js';
import { HealthController } from './health.controller.js';

const setup = async (healthStorageThresholdPercent?: number) => {
  const app: TestingModule = await Test.createTestingModule({
    imports: [CommonModule.register({ healthStorageThresholdPercent })],
  }).compile();

  return app.get(HealthController);
};

describe('health endpoint', () => {
  it('should return the liveness status of the application', async () => {
    expect.assertions(1);
    const healthController = await setup();
    const healthCheckStatus = await healthController.liveness();

    expect(healthCheckStatus.status).toBe('ok');
  });

  it('should return a liveness error', async () => {
    expect.assertions(1);
    const healthController = await setup(0);
    await expect(healthController.liveness()).rejects.toThrow(ServiceUnavailableException);
  });

  it('should return the readiness status of the application', async () => {
    expect.assertions(1);
    const healthController = await setup();
    const healthCheckStatus = await healthController.readiness();

    expect(healthCheckStatus.status).toBe('ok');
  });
});
