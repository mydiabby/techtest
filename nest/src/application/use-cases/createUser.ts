import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { UserService, UserServiceKey } from '../ports/user.port';
import { User } from 'src/domain/entities/user';
import { UserErrorCode } from 'src/domain/errors/user-error-codes';

@Injectable()
export class CreateUser {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  async execute(firstName: string, lastName: string): Promise<User> {
    const existing = await this.userService.findByFirstAndLastName(
      firstName,
      lastName,
    );

    if (existing) {
      throw new ConflictException({
        code: UserErrorCode.UserAlreadyExists,
        message: `A user with the name "${firstName} ${lastName}" already exist`,
      });
    }

    return this.userService.createUser(firstName, lastName);
  }
}
