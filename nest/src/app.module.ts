import { Module } from '@nestjs/common';

//Infrastructure
import { TypeormModule } from './infrastructure/typeorm/typeorm.module';

//Interceptors
import { APP_INTERCEPTOR } from '@nestjs/core';
import ResponseInterceptor from './application/interceptors/response.interceptor';

//Business Modules
import { HealthCheckModule } from './modules/healthcheck/healthcheck.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [TypeormModule, HealthCheckModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
