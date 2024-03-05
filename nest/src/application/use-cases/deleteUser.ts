import { Injectable, Inject } from '@nestjs/common';
import { UserService, UserServiceKey } from '../ports/user.port';
import { User } from 'src/domain/entities/user';

@Injectable()
export class DeleteUser {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  async execute(id: string): Promise<User> {
    return this.userService.deleteUser(+id);
  }
}
