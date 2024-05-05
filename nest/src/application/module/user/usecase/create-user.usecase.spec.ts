import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';

import { User } from '../class/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { UserServiceKey } from '../service/user.service';
import { CreateUser } from './create-user.usecase';

describe('CreateUser', () => {
  let createUser: CreateUser;

  const userServiceMock = {
    findUser: jest.fn(),
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUser,
        { provide: UserServiceKey, useValue: userServiceMock },
      ],
    }).compile();

    createUser = module.get<CreateUser>(CreateUser);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user', async () => {
    const createUserDtoMock: CreateUserDto = {
      firstName: 'John',
      lastName: 'Doe',
    };
    const createUserMock: User = {
      id: '1',
      ...createUserDtoMock,
    };
    userServiceMock.findUser.mockResolvedValueOnce(null);
    userServiceMock.createUser.mockResolvedValue(createUserMock);

    const user = await createUser.execute(createUserDtoMock);

    expect(user).toEqual(createUserMock);
    expect(userServiceMock.findUser).toHaveBeenCalledTimes(1);
    expect(userServiceMock.createUser).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if user already exists', async () => {
    const createUserDtoMock: CreateUserDto = {
      firstName: 'John',
      lastName: 'Doe',
    };
    const findUserDtoMock: FindUserDto = {
      ...createUserDtoMock,
    };
    userServiceMock.findUser.mockResolvedValueOnce(findUserDtoMock);

    try {
      await createUser.execute(createUserDtoMock);
      fail();
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(400);
      expect(error.message).toBe(
        'Un utilisateur avec le même couple nom/prénom existe déjà.',
      );
    }

    expect(userServiceMock.findUser).toHaveBeenCalledTimes(1);
    expect(userServiceMock.createUser).not.toHaveBeenCalled();
  });
});
