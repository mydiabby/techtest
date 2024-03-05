import { Injectable, Inject } from '@nestjs/common';
import { UserService, UserServiceKey } from '../ports/user.port';
import { User } from 'src/domain/entities/user';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUser {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }
}
