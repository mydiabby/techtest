import { User } from '@/entities/user.entity';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from 'src/modules/users/user.service';
import { UserCreateInput } from './dto/user.create.input';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  //Get List of Users
  @Get('/users')
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  //Get List of User Fullnames
  @Get('/users/fullnames')
  async getUsersFullnames(): Promise<string[]> {
    return await this.userService.getUsersFullnames();
  }

  //Add User
  @Post('/create')
  async addUser(@Body() body: UserCreateInput): Promise<User> {
    return await this.userService.addUser(body);
  }
}
