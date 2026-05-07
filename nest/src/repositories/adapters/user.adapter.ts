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
      order: { lastName: 'ASC', firstName: 'ASC' },
    });
  }

  findByFirstAndLastName(
    firstName: string,
    lastName: string,
  ): Promise<User | null> {
    return this.usersRepository.findOne({ where: { firstName, lastName } });
  }

  async createUser(firstName: string, lastName: string): Promise<User> {
    const user = this.usersRepository.create({ firstName, lastName });
    return this.usersRepository.save(user);
  }
}
