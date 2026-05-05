import { Injectable, Inject } from '@nestjs/common';
import { UserService, UserServiceKey } from '../ports/user.port';
import { User } from 'src/domain/entities/user';

@Injectable()
export class GetFullNamesOfAllUsers {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  async execute(): Promise<string[]> {
    const users = await this.userService.getUsers();
    return this.getListOfFullNamesOfUser(users);
  }

  getListOfFullNamesOfUser(users: User[]): string[] {
    return users.map((user) => user.getFullName());
  }
}
