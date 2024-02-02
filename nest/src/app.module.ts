import { Module } from '@nestjs/common';
import { HealthcheckController } from './controllers/healthcheck.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConnectionService } from './database.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UserModule,
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    })
  ],
  controllers: [
    HealthcheckController
  ],
  providers: [],
})
export class AppModule {}
