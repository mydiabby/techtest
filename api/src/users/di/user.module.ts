import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from '../application/rest/controllers/users.controller'
import { UserResponseMapper } from '../application/rest/mappers/user-response.mapper'
import { UserEntityMapper } from '../infrastructure/mappers/user-entity.mapper'
import { AddUserUseCase } from '../domain/usecases/add-user.usecase'
import { PERSIST_USER, READ_USERS } from './user.tokens'
import { TypeOrmPersistUser } from '../infrastructure/persistence/typeorm-persist-user.adapter'
import { TypeOrmReadUsers } from '../infrastructure/persistence/typeorm-read-users.adapter'
import { PaginateUsersUseCase } from '../domain/usecases/paginate-users.usecase'
import { UserExceptionsFilter } from '../application/rest/filters/user-exceptions.filter'
import { UserEntity } from '../infrastructure/entities/user.entity'
import { CommonModule } from '../../common/di/common.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        CommonModule
    ],
    controllers: [
        UsersController,
    ],
    providers: [
        UserResponseMapper,
        UserEntityMapper,
        UserExceptionsFilter,
        {
            provide: PERSIST_USER,
            useClass: TypeOrmPersistUser
        },
        {
            provide: READ_USERS,
            useClass: TypeOrmReadUsers
        },
        {
            provide: AddUserUseCase,
            useFactory: (readUsers, persistUser) => new AddUserUseCase(readUsers, persistUser),
            inject: [READ_USERS, PERSIST_USER] 
        },
        {
            provide: PaginateUsersUseCase,
            useFactory: (readUsers) => new PaginateUsersUseCase(readUsers),
            inject: [READ_USERS]
        }
    ],
})
export class UserModule { }
