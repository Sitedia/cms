/* eslint-disable unicorn/prefer-module */
import { LogFormat } from '@my-events/nestjs-common';
import { HttpStatus } from '@nestjs/common';
import http from 'node:http';
import * as request from 'supertest';
import { bootstrap } from './bootstrap';

describe('nestjs application', () => {
  it('should display the status of the application', async () => {
    expect.assertions(2);
    process.env.PORT = '3001';
    process.env.APP_TLS_ENABLED = 'false';
    process.env.APP_SWAGGER_UI_ENABLED = 'true';
    process.env.APP_LOG_FORMAT = 'CONSOLE';
    const application = await bootstrap();
    const httpServer: http.Server = application.getHttpServer();
    const response = await request.agent(httpServer).get('/api/probes/liveness');

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body.status).toBe('ok');

    await application.close();
  });

  it('should be able to start on a specific port', async () => {
    expect.assertions(2);
    process.env.PORT = '3002';
    process.env.APP_TLS_ENABLED = 'false';
    process.env.APP_SWAGGER_UI_ENABLED = 'true';
    process.env.APP_LOG_FORMAT = LogFormat.CONSOLE;
    process.env.DEFAULT_STORAGE_THRESHOLD = '1';
    const application = await bootstrap();
    const httpServer: http.Server = application.getHttpServer();
    const response = await request.agent(httpServer).get('/api/probes/liveness');

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body.status).toBe('ok');

    await application.close();
  });

  it('should start in production environment using HTTPs', async () => {
    expect.assertions(1);
    process.env.PORT = '3002';
    process.env.APP_TLS_ENABLED = 'true';
    process.env.APP_SWAGGER_UI_ENABLED = 'false';
    process.env.APP_LOG_FORMAT = 'JSON';
    process.env.DEFAULT_STORAGE_THRESHOLD = '1';
    const application = await bootstrap();
    const httpServer: http.Server = application.getHttpServer();

    expect(httpServer).toBeDefined();

    await application.close();
  });

  it('should log invalid requests', async () => {
    expect.assertions(1);
    process.env.APP_TLS_ENABLED = 'false';
    process.env.APP_LOG_FORMAT = LogFormat.CONSOLE;
    process.env.DEFAULT_STORAGE_THRESHOLD = '1';
    delete process.env.APP_SWAGGER_UI_ENABLED;
    const application = await bootstrap();
    const httpServer: http.Server = application.getHttpServer();
    const response = await request.agent(httpServer).get('/unknown-path');

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);

    await application.close();
  });

  it('should log internal errors', async () => {
    expect.assertions(1);
    process.env.APP_TLS_ENABLED = 'false';
    process.env.APP_LOG_FORMAT = LogFormat.CONSOLE;
    process.env.APP_SWAGGER_UI_ENABLED = 'INVALID';
    process.env.APP_STORAGE_THRESHOLD = '0';
    const application = await bootstrap();
    const httpServer: http.Server = application.getHttpServer();
    const response = await request.agent(httpServer).get('/api/probes/readiness');

    expect(response.statusCode).toBe(HttpStatus.SERVICE_UNAVAILABLE);

    await application.close();
  });
});
