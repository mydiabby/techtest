import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { EntityPropertyNotFoundError } from 'typeorm';

@Catch(EntityPropertyNotFoundError)
export class EntityPropertyNotFoundFilter implements ExceptionFilter {
  catch(exception: EntityPropertyNotFoundError, host: ArgumentsHost) {
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
