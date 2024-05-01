import { describe, expect, it } from '@jest/globals';
import { HttpStatus } from '@nestjs/common';
import * as http from 'node:http';
import * as request from 'supertest';
import { bootstrap } from './bootstrap.js';

describe('nestjs application', () => {
  it('should display start the application', async () => {
    expect.assertions(1);
    process.env.PORT = '3001';
    process.env.APP_LOG_ENABLED = 'false';
    const application = await bootstrap();
    const httpServer = application.getHttpServer() as http.Server;
    const response = await request.agent(httpServer).get('/api/probes/liveness');

    expect(response.statusCode).toBe(HttpStatus.OK);

    await application.close();
  });
});
