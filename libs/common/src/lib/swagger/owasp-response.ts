import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorDTO } from '../dto/error.dto.js';

export const OwaspResponse = (dataType: Type<unknown>) =>
  applyDecorators(
    ApiSecurity({}),
    ApiOkResponse({
      headers: {
        'X-Rate-Limit-Limit': {},
        'Access-Control-Allow-Origin': {},
      },
      type: dataType,
    }),
    ApiTooManyRequestsResponse({
      headers: {
        'X-Rate-Limit-Limit': {},
        'Access-Control-Allow-Origin': {},
        'Retry-After': {},
      },
      type: ErrorDTO,
    }),
    ApiBadRequestResponse({
      headers: {
        'X-Rate-Limit-Limit': {},
        'Access-Control-Allow-Origin': {},
      },
      type: ErrorDTO,
    }),
    ApiUnauthorizedResponse({
      headers: {
        'X-Rate-Limit-Limit': {},
        'Access-Control-Allow-Origin': {},
      },
      type: ErrorDTO,
    }),
    ApiForbiddenResponse({
      headers: {
        'X-Rate-Limit-Limit': {},
        'Access-Control-Allow-Origin': {},
      },
      type: ErrorDTO,
    }),
    ApiInternalServerErrorResponse({
      headers: {
        'X-Rate-Limit-Limit': {},
        'Access-Control-Allow-Origin': {},
      },
      type: ErrorDTO,
    }),
  );
