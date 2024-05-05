import { Test, TestingModule } from '@nestjs/testing';

import { User } from '../class/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUser } from '../usecase/create-user.usecase';
import { GetUsers } from '../usecase/get-users.usecase';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  const getUsersUserUseMock = {
    execute: jest.fn(),
  };
  const createUserUserUseMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: GetUsers, useValue: getUsersUserUseMock },
        { provide: CreateUser, useValue: createUserUserUseMock },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const usersMock: User[] = [
        { id: '1', firstName: 'John', lastName: 'Doe' },
        { id: '2', firstName: 'Jane', lastName: 'Smith' },
      ];
      getUsersUserUseMock.execute.mockResolvedValueOnce(usersMock);

      const result = await controller.getUsers();

      expect(result).toEqual(usersMock);
      expect(getUsersUserUseMock.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDtoMock: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
      };
      const createUserMock: User = {
        id: '1',
        ...createUserDtoMock,
      };
      createUserUserUseMock.execute.mockResolvedValueOnce(createUserMock);

      const result = await controller.createUser(createUserDtoMock);

      expect(result).toEqual(createUserMock);
      expect(createUserUserUseMock.execute).toHaveBeenCalledTimes(1);
    });
  });
});
