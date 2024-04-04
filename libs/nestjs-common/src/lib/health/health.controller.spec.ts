import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from '../logger/logger.module';
import { HealthController } from './health.controller';
import { HealthModule } from './health.module';

const setup = async () => {
  const app: TestingModule = await Test.createTestingModule({
    imports: [HealthModule.register({ storageThresholdPercent: 1 }), LoggerModule.register({})],
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

  it('should return the readiness status of the application', async () => {
    expect.assertions(1);
    const healthController = await setup();
    const healthCheckStatus = await healthController.readiness();

    expect(healthCheckStatus.status).toBe('ok');
  });
});
