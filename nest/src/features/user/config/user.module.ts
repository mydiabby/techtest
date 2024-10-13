import { Module } from '@nestjs/common'
import { UserController } from '../client/user.controller'
import { userGatewayProvider } from './providers/user-gateway.provider'
import { getFullNameOfAllUsersProvider } from './providers/get-full-name-of-all-users.provider'
import { typeOrmUserSchemaProvider } from './providers/type-orm-user-schema.provider'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeormUserSchema } from '../infrastructure/typeorm-user.schema'
import { userRepositoryProvider } from './providers/user-repository.provider'
import { addUserProvider } from './providers/add-user.provider'

@Module({
    imports: [TypeOrmModule.forFeature([TypeormUserSchema])],
    controllers: [UserController],
    providers: [
        getFullNameOfAllUsersProvider,
        userGatewayProvider,
        typeOrmUserSchemaProvider,
        addUserProvider,
        userRepositoryProvider,
    ],
})
export class UserModule {}
