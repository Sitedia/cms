import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ApplicationExceptionFilter } from './application-exception.filter';
import { RequestInterceptor } from './request.interceptor';

@Module({
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: RequestInterceptor },
    { provide: APP_FILTER, useClass: ApplicationExceptionFilter },
  ],
})
export class ExceptionModule {}
