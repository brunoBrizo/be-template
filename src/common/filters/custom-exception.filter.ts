import { Log } from '@logger/interfaces/log.interface';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '@logger/logger.service';
import { ApiErrorResponse } from '@utils/api-error-response.interface';

@Catch(Error)
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {
    this.logger.setContext(CustomExceptionFilter.name);
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let message = exception.message;
    let internalMessage = exception.message;
    let statusCode: HttpStatus;

    // Handling different types of exceptions
    if (exception instanceof HttpException) {
      const httpError: any = exception.getResponse();

      if (httpError.message) {
        message = httpError.message;
        internalMessage = httpError.message;
      }
      statusCode = exception.getStatus();
    } else {
      message = 'Internal server error';
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const body: ApiErrorResponse = {
      message,
      statusCode,
    };

    this.logError(request.url, internalMessage);
    response.status(statusCode).json(body);
  }

  private logError(path: string, message: string, description?: string) {
    const log: Log = {
      path,
      message,
      description,
    };

    this.logger.logError(log);
  }
}
