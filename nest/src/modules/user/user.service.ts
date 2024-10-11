import { User } from '@/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateInput } from './dto/user.create.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  //Get Users
  async getUsers(): Promise<User[]> {
    return [];
  }

  //Get the list of all the names of the users
  async getUsersFullnames(): Promise<string[]> {
    return [];
  }

  //Add User
  async addUser(body: UserCreateInput): Promise<User> {
    return null;
  }
}
