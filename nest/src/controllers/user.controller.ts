import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUser } from 'src/application/use-cases/createUser';
import { GetAllUsers } from 'src/application/use-cases/getAllUsers';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersQueryDto } from './dtos/get-users-query.dto';
import { UserResponseDto } from './dtos/user-response.dto';

@Controller()
export class UserController {
  constructor(
    private getAllUsersUseCase: GetAllUsers,
    private createUserUseCase: CreateUser,
  ) {}

  @Get('/users')
  async getUsers(@Query() query: GetUsersQueryDto): Promise<UserResponseDto[]> {
    const users = await this.getAllUsersUseCase.execute(query);
    return users.map(UserResponseDto.fromEntity);
  }

  @Post('/users')
  async createUser(@Body() body: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.createUserUseCase.execute(
      body.firstName,
      body.lastName,
    );
    return UserResponseDto.fromEntity(user);
  }
}
