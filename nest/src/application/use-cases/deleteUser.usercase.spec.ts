import { Test, TestingModule } from '@nestjs/testing';
import { UserServiceKey } from '../ports/user.port';
import { DeleteUserUseCase } from './deleteUser.usercase';
import { DeleteResult } from 'typeorm';

describe('DeleteUserUseCase', () => {
    let service: DeleteUserUseCase;
    let userServiceMock;

    beforeEach(async () => {
        userServiceMock = {
            deleteUser: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteUserUseCase,
                { provide: UserServiceKey, useValue: userServiceMock }
            ],
        }).compile();

        service = module.get<DeleteUserUseCase>(DeleteUserUseCase);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should delete user', async () => {
        const response: DeleteResult = {
            raw: [],
            affected: 1
        };
        userServiceMock.deleteUser.mockResolvedValue(response);
        const result = await service.execute(125);
        expect(userServiceMock.deleteUser).toHaveBeenCalled();
        expect(result).toEqual(response);
    });


});