import { Test, TestingModule } from '@nestjs/testing';
import { UserService, UserServiceKey } from '../ports/user.port';
import { GetUser } from './getUser';
import { User } from '../../domain/entities/user';

describe('GetUser', () => {
  let service: GetUser;
  let userServiceMock: jest.Mocked<UserService>;

  beforeEach(async () => {
    userServiceMock = {
      getUser: jest.fn(),
    } as unknown as jest.Mocked<UserService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUser,
        { provide: UserServiceKey, useValue: userServiceMock },
      ],
    }).compile();

    service = module.get<GetUser>(GetUser);
  });

  it('should return an array of full names', async () => {
    const mockUser: User = new User('1', 'Benjamin', 'Cinquin');

    userServiceMock.getUser.mockResolvedValue(mockUser);

    const result = await service.execute(new User('1', 'Benjamin', 'Cinquin'));

    expect(result).toEqual(new User('1', 'Benjamin', 'Cinquin'));
  });
});