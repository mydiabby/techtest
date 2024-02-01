import { Injectable, Inject } from "@nestjs/common";
import { UserService, UserServiceKey } from "../ports/user.port";
import { User } from "src/domain/entities/user";

@Injectable()
export class GetFullNamesOfAllUsers {
    constructor(
        @Inject(UserServiceKey)
        private userService: UserService
    ) {}

    async getFullName(): Promise<string[]> {
        const users = await this.userService.getUsers();
        return this.getListOfFullNamesOfUser(users);
    }

    getListOfFullNamesOfUser(users: User[]): string[] {
        return users.map(user => user.getFullName());
    }

    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }

    async findById(id: number): Promise<User> {
      return await this.userService.getUser(id);
    }

    async create(user: User): Promise<User> {
      return await this.userService.addUser(user);
    }

    async update(id: number, user: User): Promise<User> {
      return await this.userService.updateUser(id, user);
    }

    async delete(id: number): Promise<void> {
      return await this.userService.deleteUser(id);
    }

}
