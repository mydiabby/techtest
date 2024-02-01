import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GetFullNamesOfAllUsers } from 'src/application/use-cases/getFullNameOfAllUsers';
import { User } from 'src/domain/entities/user';

@Controller('/users')
export class UserController {
  constructor(
    private useCase: GetFullNamesOfAllUsers,
  ) {}

  @Get('list')
  async getFullNamesOfAllUsers(): Promise<string[]> {
    return await this.useCase.getFullName();
  }

  @Get()
  async getAll(): Promise<User[]> {
    return await this.useCase.getUsers();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.useCase.findById(Number(id));
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.useCase.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatedUser: User): Promise<User> {
    return this.useCase.update(Number(id), updatedUser);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.useCase.delete(Number(id));
  }

}
