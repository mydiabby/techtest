import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserServiceKey } from "@ports/user.port";
import { GetFullNamesOfAllUsers } from "@use-cases/getFullNameOfAllUsers";
import { UserController } from "@controllers/user.controller";
import { UserAdapter } from "@adapters/user.adapter";
import { UserSchema } from "@schemas/user.schema";
import { HealthcheckController } from "@controllers/healthcheck.controller";
import { AddNewUser } from "@use-cases/addNewUser";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
  ],
  controllers: [
    UserController,
    HealthcheckController
  ],
  providers: [
    {
      provide: UserServiceKey,
      useClass: UserAdapter,
    },
    GetFullNamesOfAllUsers,
    AddNewUser
  ],
})
export class UserModule { }
