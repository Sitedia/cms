import { describe, expect, it } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { LoggerModule } from '../logger/logger.module.js';
import { HealthController } from './health.controller.js';
import { HealthModule } from './health.module.js';

const setup = async () => {
  const app = await Test.createTestingModule({
    imports: [HealthModule, LoggerModule.register({ level: 'fatal' })],
  }).compile();

  return app.get(HealthController);
};

describe('health endpoint', () => {
  it('should return the liveness status', async () => {
    expect.assertions(1);
    const healthController = await setup();
    const healthCheckStatus = healthController.liveness();

    expect(healthCheckStatus.status).toBe('OK');
  });

  it('should return the readiness status', async () => {
    expect.assertions(1);
    const healthController = await setup();
    const healthCheckStatus = healthController.readiness();

    expect(healthCheckStatus.status).toBe('OK');
  });
});
