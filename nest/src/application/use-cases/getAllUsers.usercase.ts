import { Injectable, Inject } from "@nestjs/common";
import { UserService, UserServiceKey } from "../ports/user.port";
import { User } from "src/domain/entities/user";

@Injectable()
export class GetAllUsersUseCase {
    constructor(
        @Inject(UserServiceKey)
        private userService: UserService
    ) { }

    async execute(): Promise<User[]> {
        return await this.userService.getUsers();

    }
}
