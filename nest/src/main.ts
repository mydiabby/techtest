import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const frontUrl = process.env.FRONT_URL;
  if (!frontUrl) {
    throw new Error('FRONT_URL environment variable is required');
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: frontUrl });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);
}
bootstrap();
