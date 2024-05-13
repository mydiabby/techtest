import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import { GetFullNamesOfAllUsers } from '@use-cases/getFullNameOfAllUsers';
import { AddNewUser } from '@use-cases/addNewUser';
import { CreateUserDTO } from '@dto/create-user';
import { User } from '@entities/user';
import { PaginationParams } from '@shared/types/pagination';

@Controller('users')
export class UserController {
  constructor(
    private useCaseListUsersSortedByName: GetFullNamesOfAllUsers,
    private useCaseAddUser: AddNewUser,
  ) {}

  @Get('')
  async getFullNamesOfAllUsers(
    @Query() params: PaginationParams,
  ): Promise<{ users: User[], totalUserCount: number }> {
    return await this.useCaseListUsersSortedByName.execute(params);
  }

  @Post('')
  async addUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return await this.useCaseAddUser.execute(createUserDTO);
  }
}
