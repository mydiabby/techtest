import { CreateUserDto } from '@controllers/user.dto';
import { User } from '@domain/entities/user';
import { Injectable } from '@nestjs/common';
import { IUserService } from '@ports/user.port';

@Injectable()
export class UserAdapterStub implements IUserService {
  private users: User[] = [];
  createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User = new User(
      (this.users.length + 1).toString(),
      createUserDto.firstName.charAt(0).toUpperCase() +
        createUserDto.firstName.slice(1),
      createUserDto.lastName.toUpperCase(),
    );
    this.users.push(newUser);
    return Promise.resolve(newUser);
  }

  getUsers(): Promise<User[]> {
    return Promise.resolve(
      this.users.sort(function (a, b) {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      }),
    );
  }

  checkIfUserExists(firstName: string, lastName: string): Promise<boolean> {
    const user = this.users.find(
      (user) => user.firstName === firstName && user.lastName === lastName,
    );
    return Promise.resolve(user !== undefined);
  }
}
