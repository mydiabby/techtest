import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '@ports/user.port';
import { User } from '@entities/user';
import { UserSchema } from '@schemas/user.schema';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '@dto/create-user';

@Injectable()
export class UserAdapter implements UserService {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<User>,
  ) { }

  getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: {
        firstName: createUserDTO.firstName,
        lastName: createUserDTO.lastName
      }
    });

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return this.usersRepository.save(createUserDTO);
  }
}
