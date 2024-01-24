import { CreateUserDto } from '@controllers/user.dto';
import { User } from '@domain/entities/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserService } from '@ports/user.port';
import { UserSchema } from '@repositories/schemas/user.schema';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class UserAdapter implements IUserService {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto);
  }

  getUsers(
    filters: FindManyOptions = { order: { firstName: 'ASC' } },
  ): Promise<User[]> {
    return this.usersRepository.find(filters);
  }

  async checkIfUserExists(
    firstName: string,
    lastName: string,
  ): Promise<boolean> {
    const [, count] = await this.usersRepository.findAndCount({
      where: { firstName, lastName },
    });
    return count > 0;
  }
}
