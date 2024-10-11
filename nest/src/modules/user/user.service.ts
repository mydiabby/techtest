import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateInput } from './dto/user.create.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //Get Users
  async getUsers(): Promise<User[]> {
    return this.userRepository.find({
      order: {
        firstname: 'DESC',
        lastname: 'ASC',
      },
    });
  }

  //Get the list of all the names of the users
  async getUsersFullnames(): Promise<string[]> {
    const users = await this.getUsers();
    if (!users) return [];
    const fullnames: string[] = users.map(
      (user) => `${user.firstname} ${user.lastname}`,
    );
    return fullnames;
  }

  //Add User
  async addUser(body: UserCreateInput): Promise<User> {
    const user = new User();
    const newUser = Object.assign(user, body);
    return this.userRepository.save(newUser);
  }
}
