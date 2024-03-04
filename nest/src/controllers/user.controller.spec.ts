import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { GetAllUsers } from 'src/application/use-cases/getAllUsers';
import { CreateUser } from 'src/application/use-cases/createUser';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserDto } from 'src/dto/user.dto';

describe('UserController', () => {
  let controller: UserController;

  // Mock users
  const mockUsers: UserDto[] = [
    { id: '1', firstName: 'Jon', lastName: 'Snow' },
  ];
  const mockCreateUserDto: CreateUserDto = {
    firstName: 'Jon',
    lastName: 'Snow',
  };
  const mockCreatedUser: UserDto = { id: '1', ...mockCreateUserDto };

  // Mock use cases
  const mockGetAllUsersUseCase = {
    execute: jest.fn().mockResolvedValue(mockUsers),
  };

  const mockCreateUserUseCase = {
    execute: jest.fn().mockResolvedValue(mockCreatedUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: GetAllUsers, useValue: mockGetAllUsersUseCase },
        { provide: CreateUser, useValue: mockCreateUserUseCase },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should return all users successfully', async () => {
    const users = await controller.getAllUsers();

    expect(users).toEqual(mockUsers);
    expect(mockGetAllUsersUseCase.execute).toHaveBeenCalledTimes(1);
  });

  it('should create a user successfully', async () => {
    const user = await controller.createUser(mockCreateUserDto);

    expect(user).toEqual(mockCreatedUser);
    expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(
      mockCreateUserDto,
    );
    expect(mockCreateUserUseCase.execute).toHaveBeenCalledTimes(1);
  });
});
