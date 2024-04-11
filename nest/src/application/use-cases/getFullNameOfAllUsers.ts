import { Injectable, Inject } from "@nestjs/common";
import { UserService, UserServiceKey } from "../ports/user.port";
import { User } from "src/domain/entities/user";
import { CreateUserDTO } from "src/domain/dto/create-user";

@Injectable()
export class GetFullNamesOfAllUsers {
    constructor(
        @Inject(UserServiceKey)
        private userService: UserService
    ) { }

    async execute(): Promise<string[]> {
        const users = await this.userService.getUsers();
        return this.getListOfFullNamesOfUser(users);
    }

    async add(createUserDTO: CreateUserDTO): Promise<User> {
        return await this.userService.addUser(createUserDTO);
    }

    getListOfFullNamesOfUser(users: User[]): string[] {
        return users.map(user => user.getFullName());
    }
}
