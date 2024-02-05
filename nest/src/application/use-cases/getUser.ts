import { Injectable, Inject } from '@nestjs/common';
import { UserService, UserServiceKey } from '../ports/user.port';
import { User } from 'src/domain/entities/user';

@Injectable()
export class GetUser {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  async execute(user: User): Promise<User> {
    return await this.userService.getUser(user);
  }
}
