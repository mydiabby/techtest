import { CreateUser } from '@application/use-cases/createUser';
import { CreateUserDto } from '@controllers/user.dto';
import { User } from '@domain/entities/user';
import { ConflictException } from '@nestjs/common';
import { UserAdapterStub } from './user.adapter.stub';

describe('CreateUser', () => {
  let userAdapterStub: UserAdapterStub;
  let createUser: CreateUser;

  beforeEach(() => {
    userAdapterStub = new UserAdapterStub();
    createUser = new CreateUser(userAdapterStub);
  });

  it('Create a new user', async () => {
    // GIVEN
    const createUserDto: CreateUserDto = {
      firstName: 'John',
      lastName: 'DOE',
    };

    // WHEN
    const createdUser = await createUser.execute(createUserDto);

    // THEN
    expect(createdUser).toBeDefined();
    expect(createdUser).toBeInstanceOf(User);
    expect(typeof createdUser.firstName).toBe('string');
    expect(createdUser.firstName).toBe('John');
    expect(typeof createdUser.lastName).toBe('string');
    expect(createdUser.lastName).toBe('DOE');
  });

  it('User already exists', async () => {
    try {
      // GIVEN
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'DOE',
      };

      // WHEN
      const createdUser1 = await createUser.execute(createUserDto);

      // THEN
      expect(createdUser1).toBeDefined();
      expect(createdUser1).toBeInstanceOf(User);
      expect(typeof createdUser1.firstName).toBe('string');

      await createUser.execute(createUserDto);
    } catch (error) {
      // THEN
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toBe('User already exists');
    }
  });
});
