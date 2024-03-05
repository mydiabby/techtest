import { Test, TestingModule } from '@nestjs/testing';
import { GetAllUsersUseCase } from './getAllUsers.usercase';
import { UserServiceKey } from '../ports/user.port';
import { User } from '../../domain/entities/user';
import { BadRequestException } from '@nestjs/common';

describe('GetAllUsersUseCase', () => {
    let service: GetAllUsersUseCase;
    let userServiceMock;

    beforeEach(async () => {
        userServiceMock = {
            getUsers: jest.fn(),
            getOrderedUsers: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAllUsersUseCase,
                { provide: UserServiceKey, useValue: userServiceMock }
            ],
        }).compile();

        service = module.get<GetAllUsersUseCase>(GetAllUsersUseCase);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return all users', async () => {
        const mockFoundUsers: User[] = [
            new User('1', 'Johnn', 'Doe'),
            new User('9', 'Mike', 'Smith'),
            new User('5', 'Bill', 'Rockwood')
        ];
        userServiceMock.getUsers.mockResolvedValue(mockFoundUsers);
        const result = await service.execute(null);
        expect(userServiceMock.getUsers).toHaveBeenCalled();
        expect(result).toEqual(mockFoundUsers);
    });

    it('should return all ordered users', async () => {
        const mockOrderedFoundUsers: User[] = [
            new User('5', 'Bill', 'Rockwood'),
            new User('1', 'Johnn', 'Doe'),
            new User('9', 'Mike', 'Smith')
        ];
        userServiceMock.getOrderedUsers.mockResolvedValue(mockOrderedFoundUsers);
        const result = await service.execute('firstName');
        expect(userServiceMock.getOrderedUsers).toHaveBeenCalled();
        expect(result).toEqual(mockOrderedFoundUsers);
    });

    it('should throw a BadRequestException', async () => {
        const result = async () => await service.execute('aaa');
        expect(result).rejects.toBeInstanceOf(BadRequestException);
    });

});