/* eslint-disable unicorn/prefer-module */
import { LogFormat, LogLevel } from '@my-events/nestjs-common';
import { HttpStatus } from '@nestjs/common';
import fs from 'node:fs';
import http from 'node:http';
import request from 'supertest';
import { ApplicationMode, bootstrap } from './bootstrap';

describe('nestjs application', () => {
  it('should display the status of the application', async () => {
    expect.assertions(2);
    process.env.PORT = '3001';
    process.env.APP_TLS_ENABLED = 'false';
    process.env.APP_SWAGGER_UI_ENABLED = 'true';
    process.env.APP_LOG_FORMAT = 'CONSOLE';
    process.env.APP_LOG_LEVEL = LogLevel.OFF;
    const application = await bootstrap(ApplicationMode.TEST);
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
    process.env.APP_LOG_LEVEL = LogLevel.OFF;
    process.env.DEFAULT_STORAGE_THRESHOLD = '1';
    const application = await bootstrap(ApplicationMode.SERVER);
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
    delete process.env.APP_LOG_LEVEL;
    const application = await bootstrap(ApplicationMode.TEST);
    const httpServer: http.Server = application.getHttpServer();

    expect(httpServer).toBeDefined();

    await application.close();
  });

  it('should generate the API specification in SWAGGER mode', async () => {
    expect.assertions(1);
    process.env.APP_TLS_ENABLED = 'false';
    process.env.APP_LOG_FORMAT = LogFormat.CONSOLE;
    process.env.APP_LOG_LEVEL = LogLevel.OFF;
    process.env.DEFAULT_STORAGE_THRESHOLD = '1';
    delete process.env.APP_SWAGGER_UI_ENABLED;
    const application = await bootstrap(ApplicationMode.SWAGGER);

    expect(fs.existsSync(__dirname + '/../openapi.yaml')).toBe(true);

    await application.close();
  });

  it('should log invalid requests', async () => {
    expect.assertions(1);
    process.env.APP_TLS_ENABLED = 'false';
    process.env.APP_LOG_FORMAT = LogFormat.CONSOLE;
    process.env.APP_LOG_LEVEL = LogLevel.OFF;
    process.env.DEFAULT_STORAGE_THRESHOLD = '1';
    delete process.env.APP_SWAGGER_UI_ENABLED;
    const application = await bootstrap(ApplicationMode.SWAGGER);
    const httpServer: http.Server = application.getHttpServer();
    const response: http.ServerResponse = await request.agent(httpServer).get('/unknown-path');

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);

    await application.close();
  });

  it('should log internal errors', async () => {
    expect.assertions(1);
    process.env.APP_TLS_ENABLED = 'false';
    process.env.APP_LOG_FORMAT = LogFormat.CONSOLE;
    process.env.APP_LOG_LEVEL = LogLevel.OFF;
    process.env.APP_SWAGGER_UI_ENABLED = 'INVALID';
    process.env.APP_STORAGE_THRESHOLD = '0';
    const application = await bootstrap(ApplicationMode.SWAGGER);
    const httpServer: http.Server = application.getHttpServer();
    const response: http.ServerResponse = await request.agent(httpServer).get('/api/probes/readiness');

    expect(response.statusCode).toBe(HttpStatus.SERVICE_UNAVAILABLE);

    await application.close();
  });
});
