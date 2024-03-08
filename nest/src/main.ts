import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './application/common/filters/http-exception/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { WrapResponseInterceptor } from './application/common/interceptors/wrap-response/wrap-response.interceptor';
import { TimeoutInterceptor } from './application/common/interceptors/timeout/timeout.interceptor';
import { EntityPropertyNotFoundFilter } from './application/common/filters/typeorm-exception/entity-property-not-found-exception.filter';
import { QueryFailedErrorFilter } from './application/common/filters/typeorm-exception/query-failed-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new EntityPropertyNotFoundFilter(),
    new QueryFailedErrorFilter(),
  );

  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  const options = new DocumentBuilder()
    .setTitle('⚕️ MyDiabby 🩺')
    .setDescription("An api for MyDiabby's users")
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
