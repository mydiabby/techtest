import { CreateUserDto } from '@controllers/user.dto';
import { User } from '@domain/entities/user';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IUserService, UserServiceKey } from '@ports/user.port';

@Injectable()
export class CreateUser {
  constructor(
    @Inject(UserServiceKey)
    private userService: IUserService,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    if (
      !(await this.userService.checkIfUserExists(
        createUserDto.firstName,
        createUserDto.lastName,
      ))
    ) {
      return await this.userService.createUser(createUserDto);
    }

    throw new ConflictException('User already exists');
  }
}
