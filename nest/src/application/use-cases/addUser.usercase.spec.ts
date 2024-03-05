import { Test, TestingModule } from '@nestjs/testing';
import { UserServiceKey } from '../ports/user.port';
import { User } from '../../domain/entities/user';
import { ConflictException } from '@nestjs/common';
import { AddUserUseCase } from './addUser.usercase';
import { CreateUserDto } from '../dto/create-user.dto';

describe('AddUserUseCase', () => {
    let service: AddUserUseCase;
    let userServiceMock;

    beforeEach(async () => {
        userServiceMock = {
            getUserByName: jest.fn(),
            addUser: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AddUserUseCase,
                { provide: UserServiceKey, useValue: userServiceMock }
            ],
        }).compile();

        service = module.get<AddUserUseCase>(AddUserUseCase);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should add new user', async () => {
        const newUser: CreateUserDto = { firstName: 'abcd', lastName: 'efg' };
        const createduser: User = new User('42', newUser.firstName, newUser.lastName);
        userServiceMock.getUserByName.mockResolvedValue(null);
        userServiceMock.addUser.mockResolvedValue(createduser);
        const result = await service.execute(newUser);
        expect(userServiceMock.getUserByName).toHaveBeenCalled();
        expect(userServiceMock.addUser).toHaveBeenCalled();
        expect(result).toEqual(createduser);
    });

    it('should throw a ConflictException', async () => {
        const newUser: CreateUserDto = { firstName: 'azert', lastName: 'yuiop' };
        const foundUser = { id: 33, ...newUser };
        userServiceMock.getUserByName.mockResolvedValue(foundUser);
        const result = async () => await service.execute(newUser);
        expect(result).rejects.toBeInstanceOf(ConflictException);
    });

});