import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { UserService, UserServiceKey } from '../ports/user.port';
import { User } from 'src/domain/entities/user';

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
      throw new ConflictException(
        `Un utilisateur avec le nom "${firstName} ${lastName}" existe déjà.`,
      );
    }

    return this.userService.createUser(firstName, lastName);
  }
}
