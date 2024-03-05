import { Test, TestingModule } from '@nestjs/testing';
import { UserServiceKey } from '../ports/user.port';
import { User } from '../../domain/entities/user';
import { NotFoundException } from '@nestjs/common';
import { GetUserByIdUseCase } from './getUserById.usercase';

describe('GetUserByIdUseCase', () => {
    let service: GetUserByIdUseCase;
    let userServiceMock;

    beforeEach(async () => {
        userServiceMock = {
            getUserById: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetUserByIdUseCase,
                { provide: UserServiceKey, useValue: userServiceMock }
            ],
        }).compile();

        service = module.get<GetUserByIdUseCase>(GetUserByIdUseCase);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return user by id', async () => {
        const foundUser: User = new User('58', 'Johnn', 'Doe');
        userServiceMock.getUserById.mockResolvedValue(foundUser);
        const result = await service.execute(58);
        expect(userServiceMock.getUserById).toHaveBeenCalled();
        expect(result).toEqual(foundUser);
    });

    it('should throw a NotFoundException', async () => {
        userServiceMock.getUserById.mockResolvedValue(null);
        const result = async () => await service.execute(101);
        expect(result).rejects.toBeInstanceOf(NotFoundException);
    });

});