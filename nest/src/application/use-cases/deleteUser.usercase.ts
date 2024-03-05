import { Injectable, Inject } from "@nestjs/common";
import { UserService, UserServiceKey } from "../ports/user.port";
import { DeleteResult } from "typeorm";

@Injectable()
export class DeleteUserUseCase {
    constructor(
        @Inject(UserServiceKey)
        private userService: UserService
    ) { }

    async execute(id: number): Promise<DeleteResult> {
        return await this.userService.deleteUser(id);

    }
}
