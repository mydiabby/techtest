import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api.response.interface';

@Injectable()
export default class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //Rest API
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    return next.handle().pipe(
      map((value) => {
        const data: ApiResponse = {
          success: true,
          status: 'OK',
          statusCode: response.statusCode,
        };
        value ? (data.data = value) : null;
        return data;
      }),
    );
  }
}
