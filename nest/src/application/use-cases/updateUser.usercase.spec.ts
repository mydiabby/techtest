import { Test, TestingModule } from '@nestjs/testing';
import { UserServiceKey } from '../ports/user.port';
import { UpdateUserUseCase } from './updateUser.usercase';
import { UpdateResult } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('UpdateUserUseCase', () => {
    let service: UpdateUserUseCase;
    let userServiceMock;

    beforeEach(async () => {
        userServiceMock = {
            updateUser: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateUserUseCase,
                { provide: UserServiceKey, useValue: userServiceMock }
            ],
        }).compile();

        service = module.get<UpdateUserUseCase>(UpdateUserUseCase);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should update user', async () => {
        const updateUser: UpdateUserDto = { firstName: 'abcd', lastName: 'efg' };
        const response: UpdateResult = {
            generatedMaps: [],
            raw: [],
            affected: 1
        };
        userServiceMock.updateUser.mockResolvedValue(response);
        const result = await service.execute(123, updateUser);
        expect(userServiceMock.updateUser).toHaveBeenCalled();
        expect(result).toEqual(response);
    });
});