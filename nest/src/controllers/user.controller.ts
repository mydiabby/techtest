import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetFullNamesOfAllUsers } from 'src/application/use-cases/getFullNameOfAllUsers';
import { PostUser } from 'src/application/use-cases/postUser';
import { PostUserDto } from 'src/domain/dto/post-user.dto';
import { User } from 'src/domain/entities/user';

@Controller('users')
export class UserController {
  constructor(
    private useCaseGetUsers: GetFullNamesOfAllUsers,
    private useCasePostUser: PostUser,
  ) { }

  @Get('')
  async getFullNamesOfAllUsers(): Promise<string[]> {
    return await this.useCaseGetUsers.execute();
  }

  @Post('')
  async postUser(@Body() postUserDto: PostUserDto): Promise<User> {
    return await this.useCasePostUser.execute(postUserDto);
  }
}
