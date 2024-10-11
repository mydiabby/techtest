import { createFakeUser } from '@/infrastructure/faker/user.faker';
import { TestModule } from '@/test.module';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCreateInput } from '../dto/user.create.input';
import { User } from '../user.entity';
import { UserService } from '../user.service';

describe('User Service', () => {
  let userService: UserService;
  let user: UserCreateInput;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestModule, TypeOrmModule.forFeature([User])],
      controllers: [],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  //Service
  it('User Service should be defined', () => {
    expect(userService).toBeDefined();
  });

  //Generate fake user data
  it('Should generate a fake user', async () => {
    user = createFakeUser();
    expect(user).toBeDefined();
    expect(Object.keys(user).length).toBeGreaterThan(0);
  });

  //Create User
  it('Should create a user', async () => {
    const newUser = await userService.addUser(user);
    expect(Object.keys(newUser).length).toBeGreaterThan(0);
  });

  //Find Users
  it('Should return users', async () => {
    const users = await userService.getUsers();
    expect(users?.length).toBeGreaterThan(0);
  });

  //Find Users Fullnames
  it('Should return users fullnames', async () => {
    const fullnames = await userService.getUsersFullnames();
    expect(fullnames?.length).toBeGreaterThan(0);
  });
});
