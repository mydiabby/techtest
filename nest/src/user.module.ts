import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServiceKey } from './application/ports/user.port';
import { GetFullNamesOfAllUsers } from './application/use-cases/getFullNameOfAllUsers';
import { UserController } from './controllers/user.controller';
import { UserAdapter } from './repositories/adapters/user.adapter';
import { UserSchema } from './repositories/schemas/user.schema';
import { GetFullNameOfOneUser } from './application/use-cases/getFullNameOfOneUser';
import { CreateUser } from './application/use-cases/createUser';
import { UpdateUser } from './application/use-cases/updateUser';
import { DeleteUser } from './application/use-cases/deleteUser';
import { GetOneUser } from './application/use-cases/getOneUser';
import { GetAllUsers } from './application/use-cases/getAllUsers';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UserController],
  providers: [
    {
      provide: UserServiceKey,
      useClass: UserAdapter,
    },
    GetFullNamesOfAllUsers,
    GetFullNameOfOneUser,
    GetOneUser,
    GetAllUsers,
    CreateUser,
    UpdateUser,
    DeleteUser,
  ],
})
export class UserModule {}
