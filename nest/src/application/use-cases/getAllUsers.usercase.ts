import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { UserService, UserServiceKey } from "../ports/user.port";
import { User } from "src/domain/entities/user";

@Injectable()
export class GetAllUsersUseCase {
    constructor(
        @Inject(UserServiceKey)
        private userService: UserService
    ) { }

    async execute(orderBy: string): Promise<User[]> {
        if (!orderBy) return await this.userService.getUsers();
        if (!['firstName', 'lastName'].includes(orderBy)) throw new BadRequestException('Invalid query string');
        return await this.userService.getOrderedUsers(orderBy);
    }
}
