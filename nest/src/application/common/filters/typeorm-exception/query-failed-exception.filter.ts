import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class QueryFailedErrorFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const exceptionResponse = exception.message;
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse, error: 'Bad Request', statusCode: 400 }
        : { exceptionResponse, error: 'Bad Request', statusCode: 400 };

    response.status(400).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
