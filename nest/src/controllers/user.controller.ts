import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetFullNamesOfAllUsers } from '@use-cases/getFullNameOfAllUsers';
import { GetSanitizedUserNames } from '@use-cases/getSanitizedUserNames';
import { CreateUserDTO } from '@dto/create-user';
import { User } from '@entities/user';

@Controller('users')
export class UserController {
  constructor(
    private useCaseListUser: GetFullNamesOfAllUsers,
    private useCaseAddUser: GetSanitizedUserNames,
  ) { }

  @Get('')
  async getFullNamesOfAllUsers(): Promise<string[]> {
    return await this.useCaseListUser.execute();
  }

  @Post('')
  async addUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return await this.useCaseAddUser.add(createUserDTO);
  }
}
