import { describe, expect, it } from '@jest/globals';
import { HttpStatus, ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as http from 'node:http';
import * as request from 'supertest';
import { LoggerModule } from '../logger/logger.module.js';
import { HealthModule } from './health.module.js';

const setup = async () => {
  const metadata: ModuleMetadata = { imports: [HealthModule, LoggerModule.register({ level: 'fatal' })] };
  const module: TestingModule = await Test.createTestingModule(metadata).compile();
  return await module.createNestApplication().init();
};

describe('health controller', () => {
  it('should return the liveness status', async () => {
    expect.assertions(1);
    const app = await setup();
    const httpServer = app.getHttpServer() as http.Server;

    const livenessResponse = await request.agent(httpServer).get('/probes/liveness');
    expect(livenessResponse.statusCode).toBe(HttpStatus.OK);

    await app.close();
  });

  it('should return the readiness status', async () => {
    expect.assertions(1);
    const app = await setup();
    const httpServer = app.getHttpServer() as http.Server;

    const livenessResponse = await request.agent(httpServer).get('/probes/readiness');
    expect(livenessResponse.statusCode).toBe(HttpStatus.OK);

    await app.close();
  });
});
