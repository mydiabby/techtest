import { User } from '@domain/entities/user';
import { Inject, Injectable } from '@nestjs/common';
import { IUserService, UserServiceKey } from '@ports/user.port';

@Injectable()
export class GetFullNamesOfAllUsers {
  constructor(
    @Inject(UserServiceKey)
    private userService: IUserService,
  ) {}

  async execute(): Promise<string[]> {
    const users = await this.userService.getUsers();
    return this.getListOfFullNamesOfUser(users);
  }

  getListOfFullNamesOfUser(users: User[]): string[] {
    return users.map((user) => user.getFullName());
  }
}
