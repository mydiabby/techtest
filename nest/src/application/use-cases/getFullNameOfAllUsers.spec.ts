import { Test, TestingModule } from '@nestjs/testing';
import { UserServiceKey } from '../ports/user.port';
import { User } from '../../domain/entities/user';
import { GetFullNamesOfAllUsers } from './getFullNameOfAllUsers';

describe('GetFullNamesOfAllUsers', () => {
    let service: GetFullNamesOfAllUsers;
    let userServiceMock;

    beforeEach(async () => {
        userServiceMock = {
            getUsers: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetFullNamesOfAllUsers,
                { provide: UserServiceKey, useValue: userServiceMock }
            ],
        }).compile();

        service = module.get<GetFullNamesOfAllUsers>(GetFullNamesOfAllUsers);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return fullName users list', async () => {
        const mockFoundUsers: User[] = [
            new User('1', 'Johnn', 'Doe'),
            new User('9', 'Mike', 'Smith'),
            new User('5', 'Bill', 'Rockwood')
        ];
        const expectedResult: string[] = [
            "Johnn Doe",
            "Mike Smith",
            "Bill Rockwood"
        ];
        userServiceMock.getUsers.mockResolvedValue(mockFoundUsers);
        const result = await service.execute();
        expect(userServiceMock.getUsers).toHaveBeenCalled();
        expect(result).toEqual(expectedResult);
    });

});