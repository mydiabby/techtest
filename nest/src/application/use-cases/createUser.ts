import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { UserService, UserServiceKey } from "../ports/user.port";
import { UserDto } from "src/dto/userDto";


@Injectable()
export class CreateUser {
    constructor(
        @Inject(UserServiceKey)
        private userService: UserService
    ) {}

    async execute(newUser:UserDto): Promise<any> {
        this.verifyExistingUser(newUser)
        return this.createUser(newUser)
    }

    async verifyExistingUser(newUser:UserDto) {
        const existingUser = this.userService.getUserBy(newUser.firstName, newUser.lastName)
        if (existingUser) {
            throw new BadRequestException('User Already Exists')
        }
    }

    async createUser(newUser:UserDto) {
        return await this.userService.addUser(newUser);
    }
}