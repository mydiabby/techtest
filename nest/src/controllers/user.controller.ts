import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUser } from 'src/application/use-cases/createUser';
import { GetAllUsers } from 'src/application/use-cases/getAllUsers';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserDto } from 'src/dto/user.dto';

@Controller('users')
export class UserController {
  constructor(
    private getAllUsersUseCase: GetAllUsers,
    private createUserUseCase: CreateUser,
  ) {}

  @Get()
  @HttpCode(200)
  async getAllUsers(): Promise<UserDto[]> {
    try {
      return await this.getAllUsersUseCase.execute();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Erreur interne du serveur',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post()
  @HttpCode(200)
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.createUserUseCase.execute(createUserDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Erreur interne du serveur',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
