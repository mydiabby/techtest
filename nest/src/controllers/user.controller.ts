import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { GetFullNamesOfAllUsers } from 'src/application/use-cases/getFullNameOfAllUsers';
import { CreateUser } from 'src/application/use-cases/createUser';
import { User } from 'src/domain/entities/user';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller()
export class UserController {
  constructor(
    private getFullNamesOfAllUsers: GetFullNamesOfAllUsers,
    private createUserUseCase: CreateUser,
  ) {}

  @Get('/users')
  async getUsers(): Promise<string[]> {
    return await this.getFullNamesOfAllUsers.execute();
  }

  @Post('/users')
  @HttpCode(201)
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.createUserUseCase.execute(body.firstName, body.lastName);
  }
}
