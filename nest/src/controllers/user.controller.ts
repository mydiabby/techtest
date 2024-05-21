import {Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import { ManageUser } from '@use-cases/manageUser';
import { CreateUserDTO } from '@dto/create-user';
import { User } from '@entities/user';
import { PaginationParams } from '@shared/types/pagination';
import { UpdateUserDTO } from '@dto/update-user';

@Controller('users')
export class UserController {
  constructor(
    private useCaseManageUser: ManageUser,
  ) {}

  @Get('')
  async getFullNamesOfAllUsers(
    @Query() params: PaginationParams,
  ): Promise<{ users: User[], totalUserCount: number }> {
    return await this.useCaseManageUser.execute(params);
  }

  @Post('')
  async addUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return await this.useCaseManageUser.addUser(createUserDTO);
  }

  @Put(':id')
  async updateUser(@Param("id") id: number, @Body() updateUserDTO: UpdateUserDTO): Promise<User> {
    updateUserDTO.id = id;
    return await this.useCaseManageUser.updateUser(updateUserDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.useCaseManageUser.delete(id);
  }
}
