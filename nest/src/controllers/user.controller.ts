import { Body, Controller, Get, Post, Inject } from '@nestjs/common';
import { UserService } from 'src/application/ports/user.port';
import { GetFullNamesOfAllUsers } from 'src/application/use-cases/getFullNameOfAllUsers';
import { UserDto } from 'src/dto/userDto';
import { UserAdapter } from 'src/repositories/adapters/user.adapter';
import { UserServiceKey } from "src/application/ports/user.port";

@Controller()
export class UserController {
  constructor(
    private useCase: GetFullNamesOfAllUsers,
    @Inject(UserServiceKey) private readonly userAdapter: UserAdapter
  ) {}

  @Get('/users')
  async getFullNamesOfAllUsers(): Promise<string[]> {
    return await this.useCase.execute();
  }

  @Post('/users/add') 
  async create (@Body() createUserDto:UserDto){
    console.log("createUser",createUserDto)
    return await this.userAdapter.addUser(createUserDto);
  }

}
