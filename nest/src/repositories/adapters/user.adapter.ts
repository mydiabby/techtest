import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/application/ports/user.port';
import { User } from 'src/domain/entities/user';
import { UserSchema } from '../schemas/user.schema';
import { Repository } from 'typeorm';

@Injectable()
export class UserAdapter implements UserService {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.find({
      order: {
        firstName: 'ASC',
        lastName: 'ASC',
      },
    });
  }

  getUser(user: User): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  }

  postUser(user: User): void {
    this.usersRepository.save(user);
  }
}
