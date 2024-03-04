import { Injectable, Inject } from "@nestjs/common";
import { UserService, UserServiceKey } from "../ports/user.port";
import { UpdateUserDto } from "src/application/dto/update-user.dto";
import { UpdateResult } from "typeorm";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject(UserServiceKey)
        private userService: UserService
    ) { }

    async execute(id: number, user: UpdateUserDto): Promise<UpdateResult> {
        return await this.userService.updateUser(id, user);

    }
}
