import { Injectable, Inject } from '@nestjs/common';
import {
  GetUsersOptions,
  UserService,
  UserServiceKey,
} from '../ports/user.port';
import { User } from 'src/domain/entities/user';

@Injectable()
export class GetAllUsers {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  execute(options?: GetUsersOptions): Promise<User[]> {
    return this.userService.getUsers(options);
  }
}
