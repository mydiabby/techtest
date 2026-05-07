import { Module } from '@nestjs/common';
import { HealthcheckController } from './controllers/healthcheck.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: 5432,
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [HealthcheckController],
  providers: [],
})
export class AppModule {}
