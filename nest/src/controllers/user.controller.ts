import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { AddUserUseCase } from 'src/application/use-cases/addUser.usercase';
import { GetAllUsersUseCase } from 'src/application/use-cases/getAllUsers.usercase';
import { GetFullNamesOfAllUsers } from 'src/application/use-cases/getFullNameOfAllUsers';
import { UpdateUserUseCase } from 'src/application/use-cases/updateUser.usercase';
import { CreateUserDto } from 'src/application/dto/create-user.dto';
import { User } from 'src/domain/entities/user';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateUserDto } from 'src/application/dto/update-user.dto';
import { DeleteUserUseCase } from 'src/application/use-cases/deleteUser.usercase';
import { GetUserByIdUseCase } from 'src/application/use-cases/getUserById.usercase';

@Controller('/public/users')
export class UserController {

    constructor(
        private getFullNamesOfAllUsersUseCase: GetFullNamesOfAllUsers,
        private addUserUseCase: AddUserUseCase,
        private getAllUsersUseCase: GetAllUsersUseCase,
        private getUserByIdUseCase: GetUserByIdUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private deleteUserUseCase: DeleteUserUseCase
    ) { }

    @Get('/fullname')
    async getFullNamesOfAllUsers(): Promise<string[]> {
        return await this.getFullNamesOfAllUsersUseCase.execute();
    }

    @Get()
    async getAllUsers(@Query('orderBy') orderBy: string): Promise<User[]> {
        return await this.getAllUsersUseCase.execute(orderBy);
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return await this.getUserByIdUseCase.execute(id);
    }

    @Post()
    async addNewUser(@Body() user: CreateUserDto): Promise<User> {
        return await this.addUserUseCase.execute(user);
    }

    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto): Promise<UpdateResult> {
        return await this.updateUserUseCase.execute(id, user);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return await this.deleteUserUseCase.execute(id);
    }
}
