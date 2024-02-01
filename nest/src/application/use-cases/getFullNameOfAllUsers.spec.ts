import { GetFullNamesOfAllUsers } from './getFullNameOfAllUsers';
import { UserService } from '../ports/user.port';
import { User } from 'src/domain/entities/user';

describe('GetFullNamesOfAllUsers', () => {
  let getFullNamesOfAllUsers: GetFullNamesOfAllUsers;
  let userService: UserService;

  beforeEach(() => {
    userService = {
      getUsers: jest.fn(),
      getUser: jest.fn(),
      addUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };
    getFullNamesOfAllUsers = new GetFullNamesOfAllUsers(userService);
  });

  describe('getFullName', () => {
    it('should return an array of full names', async () => {
      // Arrange
      const mockUsers: User[] = [
        { id: 1, firstName: 'John', lastName: 'Doe', getFullName: jest.fn(() => 'John Doe') },
        { id: 2, firstName: 'Jane', lastName: 'Smith', getFullName: jest.fn(() => 'Jane Smith') },
      ];
      jest.spyOn(userService, 'getUsers').mockResolvedValueOnce(mockUsers);

      // Act
      const result = await getFullNamesOfAllUsers.getFullName();

      // Assert
      expect(result).toEqual(['John Doe', 'Jane Smith']);
      expect(userService.getUsers).toHaveBeenCalled();
      expect(mockUsers[0].getFullName).toHaveBeenCalled();
      expect(mockUsers[1].getFullName).toHaveBeenCalled();
    });
  });

  // Add more test cases for other methods like getUsers, findById, create, update, delete

  describe('getFullName', () => {
    it('should return an array of full names', async () => {
      // Arrange
      const mockUsers: User[] = [
        { id: 1, firstName: 'John', lastName: 'Doe', getFullName: jest.fn(() => 'John Doe') },
        { id: 2, firstName: 'Jane', lastName: 'Smith', getFullName: jest.fn(() => 'Jane Smith') },
      ];
      jest.spyOn(userService, 'getUsers').mockResolvedValueOnce(mockUsers);

      // Act
      const result = await getFullNamesOfAllUsers.getFullName();

      // Assert
      expect(result).toEqual(['John Doe', 'Jane Smith']);
      expect(userService.getUsers).toHaveBeenCalled();
      expect(mockUsers[0].getFullName).toHaveBeenCalled();
      expect(mockUsers[1].getFullName).toHaveBeenCalled();
    });
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      // Arrange
      const mockUsers: User[] = [
        { id: 1, firstName: 'John', lastName: 'Doe', getFullName: jest.fn() },
        { id: 2, firstName: 'Jane', lastName: 'Smith', getFullName: jest.fn() },
      ];
      jest.spyOn(userService, 'getUsers').mockResolvedValueOnce(mockUsers);

      // Act
      const result = await getFullNamesOfAllUsers.getUsers();

      // Assert
      expect(result).toEqual(mockUsers);
      expect(userService.getUsers).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      // Arrange
      const userId = 1;
      const mockUser: User = { id: userId, firstName: 'John', lastName: 'Doe', getFullName: jest.fn() };
      jest.spyOn(userService, 'getUser').mockResolvedValueOnce(mockUser);

      // Act
      const result = await getFullNamesOfAllUsers.findById(userId);

      // Assert
      expect(result).toEqual(mockUser);
      expect(userService.getUser).toHaveBeenCalledWith(userId);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      // Arrange
      const newUser: User = { id: 1, firstName: 'John', lastName: 'Doe', getFullName: jest.fn() };
      jest.spyOn(userService, 'addUser').mockResolvedValueOnce(newUser);

      // Act
      const result = await getFullNamesOfAllUsers.create(newUser);

      // Assert
      expect(result).toEqual(newUser);
      expect(userService.addUser).toHaveBeenCalledWith(newUser);
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      // Arrange
      const userId = 1;
      const updatedUser: User = { id: userId, firstName: 'John', lastName: 'Updated', getFullName: jest.fn() };
      jest.spyOn(userService, 'updateUser').mockResolvedValueOnce(updatedUser);

      // Act
      const result = await getFullNamesOfAllUsers.update(userId, updatedUser);

      // Assert
      expect(result).toEqual(updatedUser);
      expect(userService.updateUser).toHaveBeenCalledWith(userId, updatedUser);
    });
  });

  describe('delete', () => {
    it('should delete a user by id', async () => {
      // Arrange
      const userId = 1;
      jest.spyOn(userService, 'deleteUser').mockResolvedValueOnce();

      // Act
      await getFullNamesOfAllUsers.delete(userId);

      // Assert
      expect(userService.deleteUser).toHaveBeenCalledWith(userId);
    });
  });

});
