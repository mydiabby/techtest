import { Module } from '@nestjs/common';

//Infrastructure
import { TypeormModule } from './infrastructure/typeorm/typeorm.module';

//Interceptors
import { APP_INTERCEPTOR } from '@nestjs/core';
import ResponseInterceptor from './application/interceptors/response.interceptor';

//Business Modules
import { UserModule } from './modules/users/user.module';

//Controller
import { AppController } from './app.controller';


@Module({
  imports: [TypeormModule, UserModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
