import { ArgumentsHost, ForbiddenException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { LogLevel } from '../logger/log-level.enum';
import { LoggerModule } from '../logger/logger.module';
import { ApplicationExceptionFilter } from './application-exception.filter';
import { ExceptionDTO } from './exception.dto';
import { ExceptionModule } from './exception.module';

describe('exception filter', () => {
  it('should load the exception filter', async () => {
    expect.assertions(1);

    const application = await Test.createTestingModule({
      imports: [ExceptionModule, LoggerModule.register({ logLevel: LogLevel.OFF })],
    }).compile();

    expect(application).toBeDefined();
  });

  it('should return a client exception with the message', async () => {
    expect.assertions(2);

    // Create a mock to intercept the exception
    let responseStatus: HttpStatus | undefined;
    let result: ExceptionDTO | undefined;
    const responseMock = {
      status: (status: number) => ({
        json: (response: ExceptionDTO) => {
          responseStatus = status;
          result = response;
        },
      }),
    };
    const hostMock = {
      switchToHttp: () => ({
        getRequest: () => ({ url: 'http://localhost/my-query' }),
        getResponse: () => responseMock,
      }),
    };

    // Trigger the exception
    const applicationExceptionFilter = new ApplicationExceptionFilter();
    applicationExceptionFilter.catch(new ForbiddenException('My message'), hostMock as ArgumentsHost);

    expect(responseStatus).toBe(HttpStatus.FORBIDDEN);
    expect(result?.message).toBe('My message');
  });

  it('should return a server exception without the message', async () => {
    expect.assertions(2);

    // Create a mock to intercept the exception
    let responseStatus: HttpStatus | undefined;
    let result = new ExceptionDTO();
    const responseMock = {
      status: (status: number) => ({
        json: (response: ExceptionDTO) => {
          responseStatus = status;
          result = response;
        },
      }),
    };
    const hostMock = {
      switchToHttp: () => ({
        getRequest: () => ({ url: 'http://localhost/my-query' }),
        getResponse: () => responseMock,
      }),
    };

    // Trigger the exception
    const applicationExceptionFilter = new ApplicationExceptionFilter();
    applicationExceptionFilter.catch(new InternalServerErrorException('My internal error'), hostMock as ArgumentsHost);

    expect(responseStatus).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(result.message).toBe('An internal server error occurred');
  });
});
