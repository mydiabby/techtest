import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { UserService, UserServiceKey } from "../ports/user.port";
import { User } from "src/domain/entities/user";

@Injectable()
export class GetUserByIdUseCase {
    constructor(
        @Inject(UserServiceKey)
        private userService: UserService
    ) { }

    async execute(id: number): Promise<User> {
        const user = await this.userService.getUserById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;

    }
}
