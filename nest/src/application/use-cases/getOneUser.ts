import { Injectable, Inject } from '@nestjs/common';
import { UserService, UserServiceKey } from '../ports/user.port';
import { User } from 'src/domain/entities/user';

@Injectable()
export class GetOneUser {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userService.getUser(+id);
    return user;
  }
}
