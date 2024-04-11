import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetFullNamesOfAllUsers } from 'src/application/use-cases/getFullNameOfAllUsers';
import { CreateUserDTO } from 'src/domain/dto/create-user';
import { User } from 'src/domain/entities/user';

@Controller('users')
export class UserController {
  constructor(
    private useCase: GetFullNamesOfAllUsers
  ) { }

  @Get('')
  async getFullNamesOfAllUsers(): Promise<string[]> {
    return await this.useCase.execute();
  }

  @Post('')
  async addUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return await this.useCase.add(createUserDTO);
  }
}
