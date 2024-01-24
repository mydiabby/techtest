import { UserController } from '@controllers/user.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServiceKey } from '@ports/user.port';
import { UserAdapter } from '@repositories/adapters/user.adapter';
import { UserSchema } from '@repositories/schemas/user.schema';
import { CreateUser } from '@use-cases/createUser';
import { GetFullNamesOfAllUsers } from '@use-cases/getFullNameOfAllUsers';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UserController],
  providers: [
    {
      provide: UserServiceKey,
      useClass: UserAdapter,
    },
    GetFullNamesOfAllUsers,
    CreateUser,
  ],
})
export class UserModule {}
