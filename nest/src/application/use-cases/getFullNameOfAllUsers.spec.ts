import { Test, TestingModule } from '@nestjs/testing';
import { UserService, UserServiceKey } from '../ports/user.port';
import { GetFullNamesOfAllUsers } from './getFullNameOfAllUsers';
import { User } from '../../domain/entities/user';

describe('GetFullNamesOfAllUsers', () => {
  let service: GetFullNamesOfAllUsers;
  let userServiceMock: jest.Mocked<UserService>;

  beforeEach(async () => {
    userServiceMock = {
      getUsers: jest.fn(),
    } as unknown as jest.Mocked<UserService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetFullNamesOfAllUsers,
        { provide: UserServiceKey, useValue: userServiceMock },
      ],
    }).compile();

    service = module.get<GetFullNamesOfAllUsers>(GetFullNamesOfAllUsers);
  });

  it('should return an array of full names', async () => {
    const mockUsers: User[] = [
      new User('1', 'Benjamin', 'Cinquin'),
      new User('2', 'Jordan', 'Chapuis'),
    ];

    userServiceMock.getUsers.mockResolvedValue(mockUsers);

    const result = await service.execute();

    expect(result).toEqual(['Benjamin Cinquin', 'Jordan Chapuis']);
  });
});