import { ConflictException } from '@nestjs/common';
import { CreateUser } from './createUser';
import { UserService } from '../ports/user.port';
import { User } from 'src/domain/entities/user';

describe('CreateUser', () => {
  let userService: jest.Mocked<UserService>;
  let useCase: CreateUser;

  beforeEach(() => {
    userService = {
      getUsers: jest.fn(),
      findByFirstAndLastName: jest.fn(),
      createUser: jest.fn(),
    };
    useCase = new CreateUser(userService);
  });

  it('creates a new user when no duplicate exists', async () => {
    const created = new User('1', 'Simon', 'Dupont');
    userService.findByFirstAndLastName.mockResolvedValue(null);
    userService.createUser.mockResolvedValue(created);

    const result = await useCase.execute('Simon', 'Dupont');

    expect(userService.createUser).toHaveBeenCalledWith('Simon', 'Dupont');
    expect(result).toBe(created);
  });

  it('throws a ConflictException with USER_ALREADY_EXISTS code when a user with the same name already exists', async () => {
    userService.findByFirstAndLastName.mockResolvedValue(
      new User('1', 'Simon', 'Dupont'),
    );

    const promise = useCase.execute('Simon', 'Dupont');

    await expect(promise).rejects.toThrow(ConflictException);
    await expect(promise).rejects.toMatchObject({
      response: { code: 'USER_ALREADY_EXISTS' },
    });
    expect(userService.createUser).not.toHaveBeenCalled();
  });
});
