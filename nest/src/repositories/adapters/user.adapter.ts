import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/application/ports/user.port';
import { User } from 'src/domain/entities/user';
import { UserSchema } from '../schemas/user.schema';
import { Repository } from 'typeorm';
import { PostUserDto } from 'src/domain/dto/post-user.dto';

@Injectable()
export class UserAdapter implements UserService {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<User>,
  ) { }

  getUsers(): Promise<User[]> {
    return this.usersRepository.find({ order: { lastName: 'ASC' } });
  }

  async postUser(postUserDto: PostUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ ...postUserDto });

    if (user) {
      throw new ConflictException();
    }

    return this.usersRepository.save(postUserDto);
  }
}
