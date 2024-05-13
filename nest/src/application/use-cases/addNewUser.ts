import { Injectable, Inject } from "@nestjs/common";
import { UserService, UserServiceKey } from "@ports/user.port";
import { User } from "@entities/user";
import { CreateUserDTO } from "@dto/create-user";

@Injectable()
export class AddNewUser {
    constructor(
        @Inject(UserServiceKey)
        private userService: UserService
    ) { }

    async execute(createUserDTO: CreateUserDTO): Promise<User> {
        const user = this.getUserWithFullNameToLowerCase(createUserDTO);
        return await this.userService.addUser(user);
    }

    getUserWithFullNameToLowerCase(user: CreateUserDTO): CreateUserDTO {
        user.firstName = user.firstName.trim().toLowerCase();
        user.lastName = user.lastName.trim().toLowerCase();
        return user;
    }
}
