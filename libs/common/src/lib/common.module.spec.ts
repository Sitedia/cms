import { describe, expect, it } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { CommonModule } from './common.module.js';
import { ApplicationLogger } from './logger/application.logger.js';

describe('common module', () => {
  it('should start in sync mode', async () => {
    expect.assertions(1);
    const app = await Test.createTestingModule({
      imports: [CommonModule.register({ healthStorageThresholdPercent: 1 })],
    }).compile();
    expect(app.get(ApplicationLogger)).toBeDefined();
  });

  it('should start in async mode', async () => {
    expect.assertions(1);
    const app = await Test.createTestingModule({
      imports: [
        CommonModule.registerAsync({
          useFactory: () => ({ healthStorageThresholdPercent: 1 }),
        }),
      ],
    }).compile();
    expect(app.get(ApplicationLogger)).toBeDefined();
  });
});
