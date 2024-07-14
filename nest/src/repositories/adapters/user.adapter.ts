import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/application/ports/user.port';
import { User } from 'src/domain/entities/user';
import { UserSchema } from '../schemas/user.schema';
import { Repository } from 'typeorm';
import { UserDto } from 'src/dto/userDto';

@Injectable()
export class UserAdapter implements UserService {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUserBy(firstName, lastName) {
    return await this.usersRepository.findOne({
      where: {
        firstName,
        lastName,
      }
    });
  }

  async addUser(newUser: UserDto): Promise<User>{ 
    const newUserData = await this.usersRepository.create(newUser);
    return this.usersRepository.save(newUserData)}
}
