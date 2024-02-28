import { Injectable, Inject, HttpException } from '@nestjs/common';
import { UserService, UserServiceKey } from '../ports/user.port';
import { User } from 'src/domain/entities/user';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from 'src/repositories/schemas/user.schema';
import { Repository } from 'typeorm';

@Injectable()
export class CreateUser {
  constructor(
    @Inject(UserServiceKey)
    private userService: UserService,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    if (await this.userService.findUser(createUserDto)) {
        throw new HttpException('Un utilisateur avec le même nom et prénom existe déjà.', 409);
    }
    return await this.userService.createUser(createUserDto);
  }
}
