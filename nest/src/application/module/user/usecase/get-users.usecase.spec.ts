import { Test, TestingModule } from '@nestjs/testing';

import { User } from '../class/user';
import { UserServiceKey } from '../service/user.service';
import { GetUsers } from './get-users.usecase';

describe('GetUsers', () => {
  let getUsers: GetUsers;

  const userServiceMock = {
    getUsers: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUsers,
        { provide: UserServiceKey, useValue: userServiceMock },
      ],
    }).compile();

    getUsers = module.get<GetUsers>(GetUsers);
  });

  it('should return an array of users', async () => {
    const usersMock: User[] = [
      { id: '1', firstName: 'John', lastName: 'Doe' },
      { id: '2', firstName: 'Jane', lastName: 'Smith' },
    ];
    userServiceMock.getUsers.mockResolvedValue(usersMock);

    const usersDto = await getUsers.execute();

    expect(usersDto).toEqual(usersMock);
    expect(userServiceMock.getUsers).toHaveBeenCalledTimes(1);
  });
});
