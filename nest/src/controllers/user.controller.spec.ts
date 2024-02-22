import { Test, TestingModule } from '@nestjs/testing';
import { GetFullNamesOfAllUsers } from 'src/application/use-cases/getFullNameOfAllUsers';
import { User } from 'src/domain/entities/user';
import { UserController } from './user.controller';

jest.mock('src/application/use-cases/getFullNameOfAllUsers');

describe('UserController', () => {
  let controller: UserController;
  let useCaseMock: jest.Mocked<GetFullNamesOfAllUsers>;

  beforeEach(async () => {
    useCaseMock = {
      getFullName: jest.fn(),
      getListOfFullNamesOfUser: jest.fn(),
      getUsers: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      userService: null, // add userService property here
    } as any; // adjust this line to allow userService to be null

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: GetFullNamesOfAllUsers,
          useValue: useCaseMock,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getFullNamesOfAllUsers', () => {
    it('should return an array of full names', async () => {
      const result: string[] = ['John Doe', 'Jane Smith'];
      useCaseMock.getFullName.mockResolvedValue(result);

      const response = await controller.getFullNamesOfAllUsers();
      expect(response).toEqual(result);
    });
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const result: User[] = [
        new User(1, 'John', 'Doe'),
        new User(2, 'Jane', 'Smith'),
      ];
      // const result: User[] = [{ id: 1, firstName: 'John', lastName: 'Doe' ,  getFullName: jest.fn(() => 'John Doe')}];
      useCaseMock.getUsers.mockResolvedValue(result);

      const response = await controller.getAll();
      expect(response).toEqual(result);
    });
  });

  describe('findById', () => {
    it('should return a user by ID', async () => {
      const result: User = new User(1, 'John', 'Doe');
      useCaseMock.findById.mockResolvedValue(result);

      const response = await controller.findById('1');
      expect(response).toEqual(result);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userToCreate: User = new User(0, 'John', 'Doe');
      const createdUser: User = new User(1, 'John', 'Doe');
      useCaseMock.create.mockResolvedValue(createdUser);

      const response = await controller.create(userToCreate);
      expect(response).toEqual(createdUser);
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const userIdToUpdate = '1';
      const updatedUserData: User = new User(1, 'John', 'Doe');
      const updatedUser: User = new User(1, 'Updated', 'Name');

      useCaseMock.update.mockResolvedValue(updatedUser);

      const response = await controller.update(userIdToUpdate, updatedUserData);
      expect(response).toEqual(updatedUser);
    });
  });

  // describe('delete', () => {
  //   it('should delete a user by ID', async () => {
  //     const userIdToDelete = '1';
  //     useCaseMock.delete.mockResolvedValue();

  //     // await expect(controller.delete(userIdToDelete)).resolves.toEqual(undefined);
  //     expect(useCaseMock.delete).toHaveBeenCalledWith(Number(userIdToDelete));
  //   });
  // });
});
