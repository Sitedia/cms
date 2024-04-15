import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, throwError } from 'rxjs';
import { ApplicationLogger } from '../logger/application.logger';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  constructor(private readonly logger: ApplicationLogger) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    // Intercept and log errors
    return next.handle().pipe(
      catchError((error: Error) => {
        const status =
          error instanceof HttpException ? (error.getStatus() as HttpStatus) : HttpStatus.INTERNAL_SERVER_ERROR;

        // Log the error
        const message = `${error.message}: ${JSON.stringify(error)}`;
        if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
          this.logger.error(message, RequestInterceptor.name, error.stack);
        } else {
          this.logger.warn(message, RequestInterceptor.name);
        }

        return throwError(() => error);
      }),
    );
  }
}
