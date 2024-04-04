import { ArgumentsHost, ForbiddenException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { ApplicationExceptionFilter } from './application-exception.filter';
import { ExceptionDTO } from './exception.dto';

describe('exception filter', () => {
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
    applicationExceptionFilter.catch(new InternalServerErrorException('My internal error'), hostMock as ArgumentsHost);

    expect(responseStatus).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(result?.message).toBe('An internal server error occurred');
  });
});
