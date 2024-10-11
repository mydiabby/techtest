import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus: number;
    let message: string;
    let details: any;

    //HTTP Exception
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      httpStatus = exception.getStatus();
      message = exception.message;
      details = response['message'];
    }
    //Bad Request
    else if (exception instanceof BadRequestException) {
      message = exception.message;
      details = exception.getResponse();
    }

    //Others
    else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Something wrong happened';
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      message,
      details,
      route: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    //Send Error
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
