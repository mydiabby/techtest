
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'postgres',
      host: this.configService.get<string>("DB_HOST"),
      port: Number(this.configService.get<number>("DB_PORT")) ,
      username: this.configService.get<string>("DB_USER"),
      password: this.configService.get<string>("DB_PASS"),
      database: this.configService.get<string>("DB_NAME"),
      autoLoadEntities: true,
      synchronize: true,
    }
  }
}