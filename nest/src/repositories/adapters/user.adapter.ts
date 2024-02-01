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

  async getUsers(): Promise<User[]> {
    console.log('UserAdapter.getUsers');
    return this.usersRepository.find();
  }

  async getUser(id: number): Promise<User> {
    console.log('UserAdapter.getUser', id);
    return this.usersRepository.findOne({where: {id}});
  }

  async addUser(user: User): Promise<User> {
    console.log('UserAdapter.addUser', user);
    return this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    console.log('UserAdapter.deleteUser', id);
    await this.usersRepository.delete({id});
  }

  async updateUser(id: number, user: User): Promise<User> {
    console.log('UserAdapter.updateUser', id, user);
    await this.usersRepository.update({id}, user);
    return this.usersRepository.findOne({where: {id}});
  }
}
