import { Injectable, Inject } from "@nestjs/common";
import { UserService, UserServiceKey } from "../ports/user.port";
import { User } from "src/domain/entities/user";
import { CreateUserDto } from "src/domain/dto/create-user.dto";

@Injectable()
export class AddUserUseCase {
    constructor(
        @Inject(UserServiceKey)
        private userService: UserService
    ) { }

    async execute(user: CreateUserDto): Promise<User> {
        return await this.userService.addUser(user);

    }
}
