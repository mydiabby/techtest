import { User } from 'src/application/module/user/class/user';
import { UserService } from 'src/application/module/user/service/user.service';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { UserSchema } from '../schema/user.schema';

@Injectable()
export class UserAdapter implements UserService {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findUser(findUserDto: FindUserDto): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        lastName: findUserDto.lastName,
        firstName: findUserDto.firstName,
      },
    });
  }

  getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
