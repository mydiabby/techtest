import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { HealthcheckController } from './controllers/healthcheck.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { CommonModule } from './application/common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${path.join(__dirname, '..', '..', '.env')}`,
      validationSchema: Joi.object({
        DB_HOST: Joi.required(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: true, // TODO: disable in production
      }),
    }),
    UserModule,
    CommonModule,
  ],
  controllers: [HealthcheckController],
  providers: [],
})
export class AppModule {}
