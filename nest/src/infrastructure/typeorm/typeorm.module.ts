import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const { DB_HOST, DB_USER, DB_PORT, DB_PASS, DB_NAME } = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: parseInt(DB_PORT),
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class TypeormModule {}
