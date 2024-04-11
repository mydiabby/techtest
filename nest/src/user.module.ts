import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserServiceKey } from "@ports/user.port";
import { GetFullNamesOfAllUsers } from "@use-cases/getFullNameOfAllUsers";
import { UserController } from "@controllers/user.controller";
import { UserAdapter } from "@adapters/user.adapter";
import { UserSchema } from "@schemas/user.schema";
import { GetSanitizedUserNames } from "@use-cases/getSanitizedUserNames";

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
    GetSanitizedUserNames
  ],
})
export class UserModule { }
