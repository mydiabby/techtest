import { Injectable, Inject } from '@nestjs/common';
import { UserService, UserServiceKey } from '../ports/user.port';
import { User } from 'src/domain/entities/user';

@Injectable()
export class GetAllUsers {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  execute(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
