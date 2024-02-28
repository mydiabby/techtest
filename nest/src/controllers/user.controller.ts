import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateUser } from 'src/application/use-cases/createUser';
import { GetAllUsers } from 'src/application/use-cases/getAllUsers';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserDto } from 'src/dto/user.dto';

@Controller('users')
export class UserController {
  constructor(
    private getAllUsersUseCase: GetAllUsers,
    private createUserUseCase: CreateUser,
  ) {}

  @Get()
  @HttpCode(200)
  async getAllUsers(): Promise<UserDto[]> {
    return await this.getAllUsersUseCase.execute();
  }

  @Post()
  @HttpCode(200)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.createUserUseCase.execute(createUserDto);
  }
}
