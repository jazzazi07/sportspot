import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'object') {
        message = exceptionResponse['message'] || message;
        error = exceptionResponse['error'] || error;
      } else {
        message = exceptionResponse.toString();
      }
    } else if (exception instanceof PrismaClientKnownRequestError) {
      // Handle Prisma validation errors
      status = HttpStatus.BAD_REQUEST;
      message = 'Database operation failed';
      error = exception.code;

      // Specific Prisma error codes
      if (exception.code === 'P2002') {
        error = 'Unique constraint violation';
        message = `Unique constraint failed on field(s)`;
      } else if (exception.code === 'P2025') {
        error = 'Record not found';
        message = 'The requested record does not exist';
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      error = exception.name;
    }

    this.logger.error(`${request.method} ${request.url} - ${message}`, exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      error,
    });
  }
}
