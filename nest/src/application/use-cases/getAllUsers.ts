import { Injectable, Inject } from '@nestjs/common';
import { UserService, UserServiceKey } from '../ports/user.port';
import { User } from 'src/domain/entities/user';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class GetAllUsers {
  // GetUsersOrderedAlphabetically
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  async execute(): Promise<UserDto[]> {
    const users = await this.userService.getUsers();
    console.log(users);

    const usersDto = users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
    }));

    return usersDto.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }
}
