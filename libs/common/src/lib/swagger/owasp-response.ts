import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorDTO } from '../dto/error.dto.js';

const headers = {
  'X-Rate-Limit-Limit': { schema: { type: 'integer', format: 'int32', minimum: 0, maximum: 8096 } },
  'Access-Control-Allow-Origin': { schema: { type: 'string', maxLength: 1024, format: 'urls' } },
};

export interface OwaspResponseOptions {
  type: Type<unknown>;
  description: string;
}

export const OwaspResponse = (options: OwaspResponseOptions) =>
  applyDecorators(
    ApiSecurity({}),
    ApiOperation({
      description: options.description,
    }),
    ApiOkResponse({
      headers,
      description: options.description,
      type: options.type,
    }),
    ApiTooManyRequestsResponse({
      headers: {
        ...headers,
        'Retry-After': { schema: { type: 'integer', format: 'int32', minimum: 0, maximum: 8096 } },
      },
      description: 'Too many requests',
      type: ErrorDTO,
    }),
    ApiBadRequestResponse({
      headers,
      description: 'Too many requests',
      type: ErrorDTO,
    }),
    ApiUnauthorizedResponse({
      headers,
      description: 'Too many requests',
      type: ErrorDTO,
    }),
    ApiForbiddenResponse({
      headers,
      description: 'Too many requests',
      type: ErrorDTO,
    }),
    ApiInternalServerErrorResponse({
      headers,
      description: 'Too many requests',
      type: ErrorDTO,
    }),
  );
