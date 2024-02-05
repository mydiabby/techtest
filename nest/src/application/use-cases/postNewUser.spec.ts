import { Test, TestingModule } from '@nestjs/testing';
import { UserService, UserServiceKey } from '../ports/user.port';
import { User } from '../../domain/entities/user';
import { PostNewUser } from './postNewUser';

describe('PostNewUser', () => {
  let service: PostNewUser;
  let userServiceMock: jest.Mocked<UserService>;

  beforeEach(async () => {
    userServiceMock = {
      postUser: jest.fn(),
    } as unknown as jest.Mocked<UserService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostNewUser,
        { provide: UserServiceKey, useValue: userServiceMock },
      ],
    }).compile();

    service = module.get<PostNewUser>(PostNewUser);
  });

  it('should post a new user', async () => {
    const newUser = new User("id", "firstName", "lastName");

    await service.execute(newUser);

    expect(userServiceMock.postUser).toHaveBeenCalledWith(newUser);
  });

});