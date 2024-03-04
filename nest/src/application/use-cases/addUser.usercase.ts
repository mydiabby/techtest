import { Injectable, Inject, ConflictException } from "@nestjs/common";
import { UserService, UserServiceKey } from "../ports/user.port";
import { User } from "src/domain/entities/user";
import { CreateUserDto } from "src/application/dto/create-user.dto";

@Injectable()
export class AddUserUseCase {
    constructor(
        @Inject(UserServiceKey)
        private userService: UserService
    ) { }

    async execute(user: CreateUserDto): Promise<User> {
        const existingUser = await this.userService.getUserByName(user.firstName, user.lastName);
        if (existingUser) {
            //En complement d'une contrainte d'unicité dans le SGBD 
            throw new ConflictException('Username already exists');
        }
        return await this.userService.addUser(user);
    }
}
