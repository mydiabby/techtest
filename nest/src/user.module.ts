import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServiceKey } from '@ports/user.port';
import { UserController } from '@controllers/user.controller';
import { UserAdapter } from '@adapters/user.adapter';
import { UserSchema } from '@schemas/user.schema';
import { HealthcheckController } from '@controllers/healthcheck.controller';
import { ManageUser } from '@use-cases/manageUser';

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
    ManageUser
  ],
})
export class UserModule { }
