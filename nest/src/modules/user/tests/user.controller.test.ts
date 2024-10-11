import { TestModule } from '@/test.module';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../user.controller';
import { User } from '../user.entity';
import { UserService } from '../user.service';

describe('UserController', () => {
  let userController: UserController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestModule, TypeOrmModule.forFeature([User])],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
  });

  it('User Controller Should be defined', () => {
    expect(userController).toBeDefined();
  });
});
