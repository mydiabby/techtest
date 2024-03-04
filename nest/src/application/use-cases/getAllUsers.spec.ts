import { Test, TestingModule } from '@nestjs/testing';
import { UserServiceKey } from '../ports/user.port';
import { GetAllUsers } from './getAllUsers';

describe('GetAllUsers', () => {
  let getAllUsers: GetAllUsers;
  let mockUserService = {
    getUsers: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllUsers,
        {
          provide: UserServiceKey,
          useValue: mockUserService,
        },
      ],
    }).compile();

    getAllUsers = module.get<GetAllUsers>(GetAllUsers);
  });

  it('should return users sorted alphabetically by first name', async () => {
    const mockUsers = [
      { firstName: 'Jon', lastName: 'Snow', id: '1' },
      { firstName: 'Sansa', lastName: 'Stark', id: '2' },
      { firstName: 'Arya', lastName: 'Stark', id: '3' },
    ];
    mockUserService.getUsers.mockResolvedValue(mockUsers);

    const usersDto = await getAllUsers.execute();

    expect(usersDto).toEqual([
      { firstName: 'Arya', lastName: 'Stark', id: '3' },
      { firstName: 'Jon', lastName: 'Snow', id: '1' },
      { firstName: 'Sansa', lastName: 'Stark', id: '2' },
    ]);
  });
});
