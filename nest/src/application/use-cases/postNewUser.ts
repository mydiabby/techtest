import { Injectable, Inject } from '@nestjs/common';
import { UserService, UserServiceKey } from '../ports/user.port';
import { User } from 'src/domain/entities/user';

@Injectable()
export class PostNewUser {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  async execute(user: User): Promise<void> {
    this.userService.postUser(user);
  }
}
