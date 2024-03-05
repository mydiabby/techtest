import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserAdapter } from './user.adapter';
import { UserSchema } from '../schemas/user.schema';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('UserAdapter', () => {
  let service: UserAdapter;
  let userRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAdapter,
        ConfigService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(UserSchema),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<UserAdapter>(UserAdapter);
    userRepository = module.get<MockRepository>(getRepositoryToken(UserSchema));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('When user with ID exists', () => {
      it('should return the user object', async () => {
        const userId = '1';
        const expectedUser = {};
        userRepository.findOne.mockReturnValue(expectedUser);
        const user = await service.getUser(+userId);
        expect(user).toEqual(expectedUser);
      });
    });
    describe('otherwise', () => {
      it("should throw the 'NotFoundException'", async () => {
        const userId = '1';
        userRepository.findOne.mockReturnValue(undefined);
        try {
          await service.getUser(+userId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`User with id #${userId} wasn't found`);
        }
      });
    });
  });
});
