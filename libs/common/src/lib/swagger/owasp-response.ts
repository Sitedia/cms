import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponseOptions,
  ApiSecurity,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorDTO } from '../dto/error.dto.js';

const headers = {
  'Access-Control-Allow-Origin': { schema: { type: 'string', maxLength: 1024, format: 'urls' } },
  'Content-Security-Policy: ': { schema: { type: 'string', maxLength: 1024, format: 'urls' } },
  'Cross-Origin-Opener-Policy': { schema: { type: 'string', maxLength: 1024, format: 'urls' } },
  'Cross-Origin-Resource-Policy': { schema: { type: 'string', maxLength: 1024, format: 'urls' } },
  'Origin-Agent-Cluster': { schema: { type: 'string', maxLength: 1024, format: 'urls' } },
  'Referrer-Policy': { schema: { type: 'string', maxLength: 1024, format: 'urls' } },
  'Strict-Transport-Security': { schema: { type: 'string', maxLength: 1024, format: 'urls' } },
  'Vary: Origin': { schema: { type: 'string', maxLength: 1024, format: 'urls' } },
  'X-Content-Type-Options': { schema: { type: 'string', maxLength: 1024, format: 'urls' } },
  'X-Dns-Prefetch-Control': { schema: { type: 'string', maxLength: 1024, format: 'urls' } },
  'X-Download-Options': { schema: { type: 'string', maxLength: 1024, format: 'urls' } },
  'X-Frame-Options': { schema: { type: 'string', maxLength: 1024, format: 'urls' } },
  'X-Permitted-Cross-Domain-Policies': { schema: { type: 'string', maxLength: 1024, format: 'urls' } },
  'X-RateLimit-Limit': { schema: { type: 'integer', format: 'int32', minimum: 0, maximum: 8096 } },
  'X-RateLimit-Remaining': { schema: { type: 'integer', format: 'int32', minimum: 0, maximum: 8096 } },
  'X-RateLimit-Reset': { schema: { type: 'integer', format: 'int32', minimum: 0, maximum: 8096 } },
  'X-Xss-Protection': { schema: { type: 'integer', format: 'int32', minimum: 0, maximum: 8096 } },
};

export interface OwaspResponseOptions {
  type: Type<unknown>;
  description: string;
}

const errorResponse: ApiResponseOptions = {
  headers,
  description: 'Too many requests',
  type: ErrorDTO,
};

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
      ...errorResponse,
      headers: {
        ...errorResponse.headers,
        'Retry-After': { schema: { type: 'integer', format: 'int32', minimum: 0, maximum: 8096 } },
      },
    }),
    ApiBadRequestResponse(errorResponse),
    ApiUnauthorizedResponse(errorResponse),
    ApiForbiddenResponse(errorResponse),
    ApiInternalServerErrorResponse(errorResponse),
  );
