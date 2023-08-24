import { HttpStatus } from '@nestjs/common';

export interface ApiErrorResponse {
  message: string;
  statusCode: HttpStatus;
}
