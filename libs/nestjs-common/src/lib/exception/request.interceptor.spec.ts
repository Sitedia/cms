import { describe, expect, it } from '@jest/globals';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { lastValueFrom, of, throwError } from 'rxjs';
import { ApplicationLogger } from '../logger/application.logger.js';
import { RequestInterceptor } from './request.interceptor.js';

// Create a mock object interface
interface Account {
  username: string;
}

// Create a mock context for all interceptors in the tests
const contextMock = {
  switchToHttp: () => ({
    getRequest: () => ({ url: 'http://localhost/my-query' }),
    getResponse: () => ({ statusCode: 200 }),
  }),
};

// Set up each test
const setup = () => {
  const logger = new ApplicationLogger({ enabled: false });
  return new RequestInterceptor(logger);
};

describe('request interceptor', () => {
  it('should intercept the requests', async () => {
    expect.assertions(1);
    const requestInterceptor = setup();
    const handlerMock = { handle: () => of({ username: 'admin' }) };
    const observable = requestInterceptor.intercept(contextMock as ExecutionContext, handlerMock);
    const result = (await lastValueFrom(observable)) as Account;

    expect(result.username).toBe('admin');
  });

  it('should log client errors', async () => {
    expect.assertions(1);
    const requestInterceptor = setup();
    const handlerMock = { handle: () => throwError(() => new ForbiddenException('My error')) };
    const observable = requestInterceptor.intercept(contextMock as ExecutionContext, handlerMock);

    await expect(lastValueFrom(observable)).rejects.toThrow('My error');
  });

  it('should log the internal server errors', async () => {
    expect.assertions(1);
    const requestInterceptor = setup();
    const handlerMock = { handle: () => throwError(() => new Error('Internal error')) };
    const observable = requestInterceptor.intercept(contextMock as ExecutionContext, handlerMock);

    await expect(lastValueFrom(observable)).rejects.toThrow('Internal error');
  });
});
