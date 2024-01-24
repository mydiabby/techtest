import { CreateUser } from '@application/use-cases/createUser';
import { CreateUserDto } from '@controllers/user.dto';
import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetFullNamesOfAllUsers } from '@use-cases/getFullNameOfAllUsers';
import { UserPresenter } from './user.presenter';

@Controller('users')
@ApiTags('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private getFullNamesOfAllUsersUseCase: GetFullNamesOfAllUsers,
    private createUserUseCase: CreateUser,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get the full name of all users',
    type: [String],
  })
  async getFullNamesOfAllUsers(): Promise<string[]> {
    return await this.getFullNamesOfAllUsersUseCase.execute();
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: UserPresenter,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists',
  })
  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<UserPresenter> {
    const user = await this.createUserUseCase.execute(body);
    this.logger.debug(`User ${user.id} created`);
    return new UserPresenter(user);
  }
}
