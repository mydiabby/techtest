import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddUserUseCase } from 'src/application/use-cases/addUser.usercase';
import { GetAllUsersUseCase } from 'src/application/use-cases/getAllUsers.usercase';
import { GetFullNamesOfAllUsers } from 'src/application/use-cases/getFullNameOfAllUsers';
import { CreateUserDto } from 'src/domain/dto/create-user.dto';
import { User } from 'src/domain/entities/user';

@Controller('/public/users')
export class UserController {

    constructor(
        private getFullNamesOfAllUsersUseCase: GetFullNamesOfAllUsers,
        private addUserUseCase: AddUserUseCase,
        private getAllUsersUseCase: GetAllUsersUseCase,
    ) { }

    @Get('/fullname')
    async getFullNamesOfAllUsers(): Promise<string[]> {
        return await this.getFullNamesOfAllUsersUseCase.execute();
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this.getAllUsersUseCase.execute();
    }

    @Post()
    async addNewUser(@Body() user: CreateUserDto): Promise<User> {
        return await this.addUserUseCase.execute(user);
    }
}
