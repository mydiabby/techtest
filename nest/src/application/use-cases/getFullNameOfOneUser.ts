import { Injectable, Inject } from '@nestjs/common';
import { UserService, UserServiceKey } from '../ports/user.port';
import { User } from 'src/domain/entities/user';

@Injectable()
export class GetFullNameOfOneUser {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  async execute(id: string): Promise<string> {
    const user = await this.userService.getUser(+id);
    return this.getFullNameOfUser(user);
  }

  getFullNameOfUser(user: User): string {
    return user.getFullName();
  }
}
