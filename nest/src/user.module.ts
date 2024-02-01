import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserServiceKey } from "./application/ports/user.port";
import { GetFullNamesOfAllUsers } from "./application/use-cases/getFullNameOfAllUsers";
import { HealthcheckController } from "./controllers/healthcheck.controller";
import { UserController } from "./controllers/user.controller";
import { UserAdapter } from "./repositories/adapters/user.adapter";
import { UserSchema } from "./repositories/schemas/user.schema";

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
    ],
  })
  export class UserModule {}
