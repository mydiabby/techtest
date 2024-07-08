import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserServiceKey } from "src/application/ports/user.port";
import { GetFullNamesOfAllUsers } from "src/application/use-cases/getFullNameOfAllUsers";
import { UserController } from "src/controllers/user.controller";
import { UserAdapter } from "src/repositories/adapters/user.adapter";
import { UserSchema } from "src/repositories/schemas/user.schema";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
  ],
  controllers: [  
    UserController,
  ],
  providers: [
    {
      provide: UserServiceKey,
      useClass: UserAdapter,
    },
    GetFullNamesOfAllUsers,
    // No need to add UserAdapter again here since it's provided via UserServiceKey
  ],
})
export class UserModule {}