import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { ManageUser } from '@use-cases/manageUser';
import { UserService, UserServiceKey } from '@ports/user.port';
import { User } from '@entities/user';
import { CreateUserDTO } from '@dto/create-user';
import { UpdateUserDTO } from '@dto/update-user';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let manageUser: ManageUser;

  beforeEach(async () => {
    const mockUserService: Partial<UserService> = {
      getUsers: jest.fn().mockResolvedValue({
        users: [
          { id: 1, firstName: 'John', lastName: 'Doe' },
          { id: 2, firstName: 'Alice', lastName: 'Smith' },
          { id: 3, firstName: 'Bob', lastName: 'Johnson' },
        ],
        totalUserCount: 3,
      }),
      addUser: jest.fn().mockResolvedValue({
        id: 4,
        firstName: 'Jane',
        lastName: 'Doe',
      }),
      deleteUser: jest.fn().mockResolvedValue(undefined)
    };

    const mockManageUser: Partial<ManageUser> = {
      execute: jest.fn().mockResolvedValue({
        users: [
          {id: 1, firstName: "John", lastName: "Doe"},
          {id: 2, firstName: "Alice", lastName: "Smith"},
          {id: 3, firstName: "Bob", lastName: "Johnson"}
        ],
        totalUserCount: 3
      }),
      addUser: jest.fn().mockResolvedValue({
        id: 4,
        firstName: 'Jane',
        lastName: 'Doe',
      }),
      updateUser: jest.fn().mockResolvedValue({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
      }),
      delete: jest.fn().mockResolvedValue(undefined), // Mock deleteUser method
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserServiceKey,
          useValue: mockUserService,
        },
        {
          provide: ManageUser,
          useValue: mockManageUser,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserServiceKey);
    manageUser = module.get<ManageUser>(ManageUser);
  });

  it('should return a list of users in alphabetical order by last name', async () => {
    const params: { limit: number; page: number } = { page: 1, limit: 10 };
    const result = await userController.getFullNamesOfAllUsers(params);

    const sortedUsers = result.users.sort((a: User, b: User) => {
      return a.lastName.localeCompare(b.lastName);
    });

    expect(result.users).toEqual(sortedUsers);
  });

  it('should create a new user', async () => {
    const newUser: CreateUserDTO = {
      firstName: 'Jane',
      lastName: 'Doe',
    };

    const createdUser = await userController.addUser(newUser);

    expect(manageUser.addUser).toHaveBeenCalledWith(newUser);
    expect(createdUser).toEqual({
      id: 4,
      firstName: 'Jane',
      lastName: 'Doe',
    });
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDTO = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
    };
    const userId = 1;

    const updatedUser = await userController.updateUser(userId, updateUserDto);

    expect(manageUser.updateUser).toHaveBeenCalledWith(updateUserDto);
    expect(updatedUser).toEqual({
      id: Number(userId),
      firstName: 'John',
      lastName: 'Doe',
    });
  });

  it('should delete a user', async () => {
    const userId = 1;

    await userController.delete(userId);

    expect(manageUser.delete).toHaveBeenCalledWith(Number(userId));
  });
});
