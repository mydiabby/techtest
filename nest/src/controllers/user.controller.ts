import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationAndOrderQueryDto } from '../application/common/dto/pagination-order-query.dto/pagination-order-query.dto';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { UpdateUserDto } from '../application/dto/update-user.dto';
import { CreateUser } from '../application/use-cases/createUser';
import { DeleteUser } from '../application/use-cases/deleteUser';
import { GetAllUsers } from '../application/use-cases/getAllUsers';
import { GetFullNamesOfAllUsers } from '../application/use-cases/getFullNameOfAllUsers';
import { GetFullNameOfOneUser } from '../application/use-cases/getFullNameOfOneUser';
import { GetOneUser } from '../application/use-cases/getOneUser';
import { UpdateUser } from '../application/use-cases/updateUser';
import { User } from '../domain/entities/user';

@ApiTags('Users 👥')
@Controller('users')
export class UserController {
  constructor(
    private readonly getFullNamesOfAllUsersUseCase: GetFullNamesOfAllUsers,
    private readonly getFullNamesOfOneUserUseCase: GetFullNameOfOneUser,
    private readonly createUserUseCase: CreateUser,
    private readonly updateUserUseCase: UpdateUser,
    private readonly deleteUserUseCase: DeleteUser,
    private readonly getAllUsersUseCase: GetAllUsers,
    private readonly getOneUserUseCase: GetOneUser,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Success',
  })
  async getFullNamesOfAllUsers(
    @Query() paginationAndOrderQueryDto: PaginationAndOrderQueryDto,
  ): Promise<[string[], Record<string, number>]> {
    return await this.getFullNamesOfAllUsersUseCase.execute(
      paginationAndOrderQueryDto,
    );
  }

  @Get('/data')
  @ApiOkResponse({
    description: 'Success',
  })
  async getAllUsersData(
    @Query() paginationAndOrderQueryDto: PaginationAndOrderQueryDto,
  ): Promise<[User[], Record<string, number>]> {
    return await this.getAllUsersUseCase.execute(paginationAndOrderQueryDto);
  }

  @Get('/data/:id')
  @ApiOkResponse({
    description: 'Success',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async getOneUserData(@Param('id') id: string): Promise<User> {
    return await this.getOneUserUseCase.execute(id);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Success',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async getFullNameOfUserById(@Param('id') id: string): Promise<string> {
    return await this.getFullNamesOfOneUserUseCase.execute(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Patch(':id')
  @ApiOkResponse({
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.updateUserUseCase.execute(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async delete(@Param('id') id: string): Promise<User> {
    return this.deleteUserUseCase.execute(id);
  }
}
