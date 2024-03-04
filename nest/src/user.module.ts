import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserServiceKey } from "./application/ports/user.port";
import { GetFullNamesOfAllUsers } from "./application/use-cases/getFullNameOfAllUsers";
import { UserController } from "./controllers/user.controller";
import { UserAdapter } from "./repositories/adapters/user.adapter";
import { UserSchema } from "./repositories/schemas/user.schema";
import { AddUserUseCase } from "./application/use-cases/addUser.usercase";
import { GetAllUsersUseCase } from "./application/use-cases/getAllUsers.usercase";
import { UpdateUserUseCase } from "./application/use-cases/updateUser.usercase";
import { DeleteUserUseCase } from "./application/use-cases/deleteUser.usercase";
import { GetUserByIdUseCase } from "./application/use-cases/getUserById.usercase";

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
        AddUserUseCase,
        GetAllUsersUseCase,
        GetUserByIdUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase
    ],
})
export class UserModule { }
