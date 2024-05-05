import { Injectable, Inject, HttpException } from '@nestjs/common';

import { User } from '../class/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { UserService, UserServiceKey } from '../service/user.service';

@Injectable()
export class CreateUser {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    if (await this.userService.findUser(createUserDto as FindUserDto)) {
      throw new HttpException(
        'Un utilisateur avec le même couple nom/prénom existe déjà.',
        400,
      );
    }

    const user = await this.userService.createUser(createUserDto);
    return user;
  }
}
