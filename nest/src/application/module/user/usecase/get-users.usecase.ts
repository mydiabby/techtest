import { Injectable, Inject } from '@nestjs/common';

import { User } from '../class/user';
import { UserService, UserServiceKey } from '../service/user.service';

@Injectable()
export class GetUsers {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  async execute(): Promise<User[]> {
    return await this.userService.getUsers();
  }
}
