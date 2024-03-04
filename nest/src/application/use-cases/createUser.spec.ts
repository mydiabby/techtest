import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserServiceKey } from '../ports/user.port';
import { CreateUser } from './createUser';

describe('CreateUser', () => {
  let createUser: CreateUser;
  let mockUserService = {
    findUser: jest.fn(),
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUser,
        {
          provide: UserServiceKey,
          useValue: mockUserService,
        },
      ],
    }).compile();

    createUser = module.get<CreateUser>(CreateUser);
  });


  it('should throw a 409 error if a user with the same name already exists', async () => {
    const createUserDto: CreateUserDto = { firstName: 'Jon', lastName: 'Snow' };
    mockUserService.findUser.mockResolvedValueOnce(createUserDto);
  
    try {
      await createUser.execute(createUserDto);
      fail();
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(409);
      expect(error.message).toBe('Un utilisateur avec le même nom et prénom existe déjà.');
    }
  
    expect(mockUserService.findUser).toHaveBeenCalledTimes(1);
    expect(mockUserService.findUser).toHaveBeenCalledWith(createUserDto);
    expect(mockUserService.createUser).not.toHaveBeenCalled();
  });
});
