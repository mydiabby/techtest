import { Injectable, Inject } from "@nestjs/common";
import { UserService, UserServiceKey } from "@ports/user.port";
import { User } from "@entities/user";
import { CreateUserDTO } from "@dto/create-user";

@Injectable()
export class GetSanitizedUserNames {
    constructor(
        @Inject(UserServiceKey)
        private userService: UserService
    ) { }

    async add(createUserDTO: CreateUserDTO): Promise<User> {
        const sanitizedUser = this.getSanitizedUserNames(createUserDTO);
        return await this.userService.addUser(sanitizedUser);
    }

    getSanitizedUserNames(user: CreateUserDTO): CreateUserDTO {
        user.firstName = user.firstName.trim().toUpperCase();
        user.lastName = user.lastName.trim().toUpperCase();
        return user;
    }
}
