import { Body, Controller, Get, Post } from '@nestjs/common';

import { User } from '../class/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUser } from '../usecase/create-user.usecase';
import { GetUsers } from '../usecase/get-users.usecase';

@Controller('users')
export class UserController {
  constructor(
    private readonly getUsersUseCase: GetUsers,
    private readonly createUserUseCase: CreateUser,
  ) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.getUsersUseCase.execute();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.createUserUseCase.execute(createUserDto);
  }
}
