import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetFullNamesOfAllUsers } from 'src/application/use-cases/getFullNameOfAllUsers';
import { GetUser } from 'src/application/use-cases/getUser';
import { PostNewUser } from 'src/application/use-cases/postNewUser';
import { UserAlreadyExist } from 'src/common/errors/userAlreadyExist';
import { User } from 'src/domain/entities/user';

@Controller()
export class UserController {
  constructor(
    private useCase: GetFullNamesOfAllUsers,
    private postUseCase: PostNewUser,
    private getUserUseCase: GetUser,
  ) {}

  @Get('/users')
  async getFullNamesOfAllUsers(): Promise<string[]> {
    return await this.useCase.execute();
  }

  @Get('/user')
  async getUser(@Body() data: User): Promise<User> {
    return await this.getUserUseCase.execute(data);
  }

  @Post('/users')
  async postNewUser(@Body() data: User): Promise<void> {
    const user = await this.getUser(data);
    if (user) throw new UserAlreadyExist('Cet utilisateur existe déjà');
    await this.postUseCase.execute(data);
  }
}
