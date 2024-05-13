import { Injectable, Inject } from "@nestjs/common";
import { UserService, UserServiceKey } from "@ports/user.port";
import { User } from "@entities/user";
import { PaginationParams } from "@shared/types/pagination";

@Injectable()
export class GetFullNamesOfAllUsers {
    constructor(
        @Inject(UserServiceKey)
        private userService: UserService
    ) {}

    async execute(params: PaginationParams): Promise<{ users: User[], totalUserCount: number }> {
        const {users, totalUserCount} = await this.userService.getUsers(params);
        return  {users, totalUserCount}
    }

}
