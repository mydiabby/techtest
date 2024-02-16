import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { GetFullNamesOfAllUsers } from 'src/application/use-cases/getFullNameOfAllUsers';
import { User } from 'src/domain/entities/user';

@Controller('/users')
export class UserController {
  constructor(
    private useCase: GetFullNamesOfAllUsers,
  ) {}

  @Get('list')
  @ApiOkResponse({ status: 200, description: 'User\'s list returned successfully.' })
  async getFullNamesOfAllUsers(): Promise<string[]> {
    return await this.useCase.getFullName();
  }

  @Get()
  @ApiOkResponse({ status: 200, description: 'Users returned successfully.' })
  async getAll(): Promise<User[]> {
    return await this.useCase.getUsers();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiOkResponse({ status: 200, description: 'User found successfully.' })
  @ApiNoContentResponse({ status: 204, description: 'User not found.' })
  async findById(@Param('id') id: string): Promise<User> {
    const user = await this.useCase.findById(Number(id));
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NO_CONTENT);
    }
    return user;
  }
  // async findById(@Param('id') id: string): Promise<User> {
  //   return this.useCase.findById(Number(id));
  // }

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
