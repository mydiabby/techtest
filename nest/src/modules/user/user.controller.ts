import { UserService } from '@/modules/user/user.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateInput } from './dto/user.create.input';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  //Get List of Users
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  //Get List of User Fullnames
  @Get('fullnames')
  async getUsersFullnames(): Promise<string[]> {
    return await this.userService.getUsersFullnames();
  }

  //Add User
  @Post('create')
  async addUser(@Body() body: UserCreateInput): Promise<User> {
    console.log('🚀 ~ UserController ~ addUser ~ body:', body);
    return await this.userService.addUser(body);
  }
}
