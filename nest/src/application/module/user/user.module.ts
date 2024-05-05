import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAdapter } from './adapter/user.adapter';
import { UserController } from './controller/user.controller';
import { UserSchema } from './schema/user.schema';
import { UserServiceKey } from './service/user.service';
import { CreateUser } from './usecase/create-user.usecase';
import { GetUsers } from './usecase/get-users.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UserController],
  providers: [
    {
      provide: UserServiceKey,
      useClass: UserAdapter,
    },
    CreateUser,
    GetUsers,
  ],
})
export class UserModule {}
