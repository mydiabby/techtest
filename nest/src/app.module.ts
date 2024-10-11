import { Module } from '@nestjs/common';

//Infrastructure
import { TypeormModule } from './infrastructure/typeorm/typeorm.module';

//Interceptors
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import ResponseInterceptor from './application/interceptors/response.interceptor';

//Filters
import { AllExceptionsFilter } from './application/exceptions/all.exceptions';

//Business Modules
import { UserModule } from './modules/user/user.module';

//Controller
import { AppController } from './app.controller';

@Module({
  imports: [TypeormModule, UserModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
